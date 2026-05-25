from datetime import datetime

from sqlalchemy import Column, Integer, String, ForeignKey, DateTime

from app.db.base import Base


class StudySession(Base):
    __tablename__ = "study_sessions"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    subject_id = Column(Integer, ForeignKey("subjects.id"), nullable=False)

    duration_minutes = Column(Integer, nullable=False)
    study_method = Column(String, nullable=False)
    xp_earned = Column(Integer, default=0)

    created_at = Column(DateTime, default=datetime.utcnow)