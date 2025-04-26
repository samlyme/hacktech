from datetime import datetime, timedelta
import os
from dotenv import load_dotenv
import httpx
from jose import jwt

load_dotenv()
DATABASE_URL = os.getenv("DATABASE_URL", "db not found")

GOOGLE_CLIENT_ID = os.getenv("GOOGLE_CLIENT_ID")
GOOGLE_CLIENT_SECRET = os.getenv("GOOGLE_CLIENT_SECRET")
GOOGLE_REDIRECT_URI = os.getenv("GOOGLE_REDIRECT_URI")
JWT_SECRET = os.getenv("JWT_SECRET", "secret")
JWT_ALGORITHM = os.getenv("JWT_ALGORITHM", "HS256")
JWT_EXPIRATION = int(os.getenv("JWT_EXPIRATION", "10080"))  # 7 days in minutes

FRONTEND_URL = os.getenv("FRONTEND_URL")

GOOGLE_DISCOVERY_URL = "https://accounts.google.com/.well-known/openid-configuration"

async def get_google_provider_cfg():
    async with httpx.AsyncClient() as client:
        r = await client.get(GOOGLE_DISCOVERY_URL)
        return r.json()


def create_jwt_token(user_info: dict):
    payload = {
        "sub": user_info["sub"],
        "email": user_info["email"],
        "name": user_info.get("name"),
        "exp": datetime.utcnow() + timedelta(hours=1),  # token valid for 1 hour
    }
    token = jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALGORITHM)
    return token

