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

class UserPublic(UserBase):
    id: int

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
    
class RecordingBase(SQLModel):
    name: str
    file_url: str
    
class Recording(RecordingBase, table=True):
    id: int | None = Field(default=None, primary_key=True)
    user_id: int = Field(foreign_key="user.id")
    analysis: str | None = None

class RecordingUpdate(RecordingBase):
    name: str | None = None
    file_url: str | None = None
    analysis: str | None = None