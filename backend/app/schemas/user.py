from datetime import datetime
from pydantic import BaseModel, EmailStr


class UserCreate(BaseModel):
    email: EmailStr
    username: str
    full_name: str
    university: str
    career: str


class UserResponse(BaseModel):
    id: int
    email: EmailStr
    username: str
    full_name: str
    university: str
    career: str
    xp_total: int
    level: int
    streak_days: int
    created_at: datetime

    model_config = {"from_attributes": True}