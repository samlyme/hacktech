from pydantic import BaseModel
from sqlmodel import Field, SQLModel


class Token(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    username: str | None = None

class UserBase(SQLModel):
    username: str
    email: str 

class User(UserBase, table=True):
    id: int | None = Field(default=None, primary_key=True)
    username: str = Field(index=True, unique=True)
    hashed_password: str

class UserCreate(UserBase):
    password: str

class UserUpdate(UserBase):
    username: str | None = None
    email: str | None = None
    password: str | None = None
    