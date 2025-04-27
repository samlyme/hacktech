from typing import Annotated
from fastapi import APIRouter, Depends

from app.db import SessionDep
from app.model import User, UserBase, UserCreate, UserPublic
from app.utils import get_current_user, get_password_hash


router = APIRouter(prefix="/users", tags=["Users"])

@router.post("/", response_model=User)
async def create_user(user: UserCreate, session: SessionDep):
    hashed_pw = get_password_hash(user.password)
    
    user_in_db = User(
        username=user.username,
        email=user.email,
        hashed_password=hashed_pw
    )
    
    session.add(user_in_db)
    session.commit()
    session.refresh(user_in_db)
    
    return user_in_db


@router.get("/me/", response_model=UserPublic)
async def read_users_me(
    current_user: Annotated[User, Depends(get_current_user)],
):
    return current_user


@router.get("/me/items/")
async def read_own_items(
    current_user: Annotated[User, Depends(get_current_user)],
):
    return [{"item_id": "Foo", "owner": current_user.username}]