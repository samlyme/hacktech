from datetime import timedelta
from typing import Annotated

from fastapi import Depends, FastAPI, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm

from app.model import Token
from app.utils import ACCESS_TOKEN_EXPIRE_MINUTES, authenticate_user, create_access_token
from app.db import SessionDep, create_db_and_tables

from app.routes import users, token

app = FastAPI()

app.include_router(users.router)
app.include_router(token.router)

@app.on_event("startup")
def on_startup():
    create_db_and_tables()