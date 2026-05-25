from datetime import datetime
from pydantic import BaseModel


class SubjectCreate(BaseModel):
    name: str


class SubjectResponse(BaseModel):
    id: int
    name: str
    user_id: int
    created_at: datetime

    model_config = {"from_attributes": True}