from sqlalchemy import Column, Integer, String, DateTime
from datetime import datetime

from app.db.base import Base


class User(Base):

    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)

    email = Column(String, unique=True, index=True)
    username = Column(String, unique=True)
    hashed_password = Column(String, nullable=False)

    full_name = Column(String)
    university = Column(String)
    career = Column(String)

    xp_total = Column(Integer, default=0)
    level = Column(Integer, default=1)
    streak_days = Column(Integer, default=0)

    created_at = Column(DateTime, default=datetime.utcnow)