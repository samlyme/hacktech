import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from starlette.middleware.sessions import SessionMiddleware

from app.db import create_db_and_tables
from app.utils import FASTAPI_SECRET, FRONTEND_URL
from app.routes import auth
from app.routes import chat

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[FRONTEND_URL],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["*"]
)

app.add_middleware(SessionMiddleware, secret_key=FASTAPI_SECRET)

app.include_router(auth.router)
app.include_router(chat.router)

@app.get('/')
async def home():
    return {'message': 'welcome'}

@app.on_event("startup")
def on_startup():
    # Creates all tables based on the models defined
    create_db_and_tables()