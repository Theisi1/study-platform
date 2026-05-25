from datetime import datetime
from pydantic import BaseModel


class StudySessionCreate(BaseModel):
    subject_id: int
    duration_minutes: int
    study_method: str


class StudySessionResponse(BaseModel):
    id: int
    user_id: int
    subject_id: int
    duration_minutes: int
    study_method: str
    xp_earned: int
    created_at: datetime

    model_config = {"from_attributes": True}