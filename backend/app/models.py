from datetime import datetime, timedelta
from pydantic import BaseModel
from sqlmodel import SQLModel, Field

class User(SQLModel, table=True):
    id: int = Field(default=None, primary_key=True)
    email: str = Field(index=True, unique=True)
    name: str
    google_id: str = Field(unique=True, index=True)
    picture: str | None = None
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
    is_active: bool = Field(default=True)

class GoogleTokenRequest(BaseModel):
    token: str

class UserResponse(BaseModel):
    id: int
    email: str
    name: str
    picture: str | None = None
    created_at: datetime

class TokenResponse(BaseModel):
    access_token: str
    token_type: str
    user: UserResponse
