from typing import Annotated
from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import asc, select

from app.model import Recording, RecordingBase, RecordingUpdate, User
from app.utils import get_current_user
from app.db import SessionDep


router = APIRouter(prefix="/recordings", tags=["Recordings"])

@router.post("/", response_model=Recording)
async def create_recording(
    recording: RecordingBase, 
    current_user: Annotated[User, Depends(get_current_user)],
    session: SessionDep
):
    user_id = current_user.id

    if not user_id:
        raise HTTPException(status_code=400, detail="User not found")
    
    recording_db = Recording(
        name=recording.name,
        user_id=user_id,
        file_url=recording.file_url
    )

    session.add(recording_db)
    session.commit()
    session.refresh(recording_db)
    
    return recording_db

@router.get("/", response_model=list[Recording])
async def get_recordings(
    current_user: Annotated[User, Depends(get_current_user)],
    session: SessionDep
):
    statement = select(Recording).where(Recording.user_id == current_user.id).order_by(asc(Recording.created_at))
    return session.exec(statement).all()

@router.patch("/{id}", response_model=Recording)
async def update_user_recording(
    id: int,
    recording: RecordingUpdate,
    session: SessionDep
):
    recording_db = session.get(Recording, id)
    if not recording_db:
        raise HTTPException(status_code=400, detail="Recording not found")
        
    recording_dump = recording.model_dump(exclude_unset=True)
    recording_db.sqlmodel_update(recording_dump)
    
    session.add(recording_db)
    session.commit()
    session.refresh(recording_db)
    return recording_db