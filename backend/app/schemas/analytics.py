from pydantic import BaseModel


class SubjectAnalyticsItem(BaseModel):
    subject_id: int
    subject_name: str
    total_minutes: int
    total_sessions: int


class MyAnalyticsResponse(BaseModel):
    total_sessions: int
    total_minutes: int
    total_hours: float
    xp_total: int
    level: int
    streak_days: int
    active_subjects_count: int
    subjects: list[SubjectAnalyticsItem]