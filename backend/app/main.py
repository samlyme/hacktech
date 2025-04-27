from fastapi import FastAPI

from app.db import create_db_and_tables

from app.routes import users, token

app = FastAPI()

app.include_router(users.router)
app.include_router(token.router)

@app.on_event("startup")
def on_startup():
    create_db_and_tables()