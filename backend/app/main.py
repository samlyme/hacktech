import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes import auth
from app.db import create_db_and_tables

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["*"]
)

app.include_router(auth.router)

@app.get('/')
async def home():
    return {'message': 'welcome'}

@app.on_event("startup")
def on_startup():
    # Creates all tables based on the models defined
    create_db_and_tables()