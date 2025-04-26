from fastapi import APIRouter, HTTPException, Request
from fastapi.responses import RedirectResponse
import httpx
from jose import jwt
from app.utils import FRONTEND_URL, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, create_jwt_token
from app.models import User
from app.utils import get_google_provider_cfg
from app.utils import GOOGLE_REDIRECT_URI

router = APIRouter(prefix="/auth", tags=["auth"])

@router.post("/login")
async def login():
    cfg = await get_google_provider_cfg()
    print("login req received")
    authorization_endpoint = cfg["authorization_endpoint"]

    request_uri = (
        f"{authorization_endpoint}?response_type=code"
        f"&client_id={GOOGLE_CLIENT_ID}"
        f"&redirect_uri={GOOGLE_REDIRECT_URI}"
        f"&scope=openid%20email%20profile"
    )
    return RedirectResponse(request_uri)

@router.get("/callback")
async def auth_callback(request: Request):
    code = request.query_params.get("code")

    if not code:
        raise HTTPException(status_code=400, detail="No code provided")

    cfg = await get_google_provider_cfg()
    token_endpoint = cfg["token_endpoint"]

    token_data = {
        "code": code,
        "client_id": GOOGLE_CLIENT_ID,
        "client_secret": GOOGLE_CLIENT_SECRET,
        "redirect_uri": GOOGLE_REDIRECT_URI,
        "grant_type": "authorization_code",
    }

    async with httpx.AsyncClient() as client:
        token_response = await client.post(token_endpoint, data=token_data)
        token_response.raise_for_status()
        token_json = token_response.json()

    id_token = token_json["id_token"]

    # Decode id_token without verifying signature for now (can verify with Google's certs later)
    user_info = jwt.decode(id_token, key="", options={"verify_signature": False})

    # You can verify more here (e.g., audience == GOOGLE_CLIENT_ID)

    # Create our own JWT
    app_token = create_jwt_token(user_info)

    # Redirect back to frontend, passing the token in query params (or you could set a cookie)
    redirect_url = f"{FRONTEND_URL}/auth/success?token={app_token}"
    return RedirectResponse(url=redirect_url)