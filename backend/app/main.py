from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.db import create_db_and_tables

from app.routes import users, token, recordings

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(users.router)
app.include_router(token.router)
app.include_router(recordings.router)

@app.on_event("startup")
def on_startup():
    create_db_and_tables()