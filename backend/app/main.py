from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.db.session import engine
from app.db.base import Base

import app.models.user
import app.models.subject
import app.models.study_session

from app.routers import health, users, subjects, study_sessions, leaderboard, auth, analytics

Base.metadata.create_all(bind=engine)

app = FastAPI(title="Study Platform API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(health.router, prefix="/api")
app.include_router(users.router, prefix="/api")
app.include_router(subjects.router, prefix="/api")
app.include_router(study_sessions.router, prefix="/api")
app.include_router(leaderboard.router, prefix="/api")
app.include_router(auth.router, prefix="/api")
app.include_router(analytics.router, prefix="/api")

