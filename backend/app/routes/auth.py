from datetime import datetime, timedelta
import uuid
from fastapi import APIRouter, HTTPException, Request
from fastapi.responses import RedirectResponse
import httpx

from jose import jwt
from google.oauth2 import id_token
from google.auth.transport import requests

from app.utils import FASTAPI_SECRET, FRONTEND_URL, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, create_access_token
from app.models import UserBase
from app.utils import GOOGLE_REDIRECT_URI

router = APIRouter(prefix="/auth", tags=["auth"])

@router.get("/login")
async def login(request: Request):
    redirect_uri = request.url_for('auth_callback')
    google_auth_url = f"https://accounts.google.com/o/oauth2/auth?client_id={GOOGLE_CLIENT_ID}&redirect_uri={redirect_uri}&response_type=code&scope=openid email profile"

    return RedirectResponse(url=google_auth_url)



@router.get("/callback")
async def auth_callback(code: str, request: Request):
    token_request_uri = "https://oauth2.googleapis.com/token"
    data = {
        'code': code,
        'client_id': GOOGLE_CLIENT_ID,
        'client_secret': GOOGLE_CLIENT_SECRET,
        'redirect_uri': request.url_for('auth_callback'),
        'grant_type': 'authorization_code',
    }

    async with httpx.AsyncClient() as client:
        response = await client.post(token_request_uri, data=data)
        response.raise_for_status()
        token_response = response.json()

    id_token_value = token_response.get('id_token')
    if not id_token_value:
        raise HTTPException(status_code=400, detail="Missing id_token in response.")

    try:
        id_info = id_token.verify_oauth2_token(id_token_value, requests.Request(), GOOGLE_CLIENT_ID)

        name = id_info.get('name')
        request.session['user_name'] = name

        return RedirectResponse(url=request.url_for('welcome'))

    except ValueError as e:
        raise HTTPException(status_code=400, detail=f"Invalid id_token: {str(e)}")

    except Exception as e:
        raise HTTPException(status_code=500, detail="Internal Server Error")
