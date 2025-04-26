from datetime import datetime, timedelta
from pydantic import BaseModel
from sqlmodel import SQLModel, Field

class Token(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    username: str | None = None


class UserBase(SQLModel, table=True):
    username: str
    email: str | None = None
    full_name: str | None = None
    disabled: bool | None = None


class UserInDB(UserBase):
    hashed_password: str