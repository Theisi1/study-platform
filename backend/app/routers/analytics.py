from collections import defaultdict

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.dependencies import get_current_user
from app.db.dependencies import get_db
from app.models.study_session import StudySession
from app.models.subject import Subject
from app.models.user import User
from app.schemas.analytics import MyAnalyticsResponse, SubjectAnalyticsItem

router = APIRouter(prefix="/analytics", tags=["Analytics"])


@router.get("/me", response_model=MyAnalyticsResponse)
def get_my_analytics(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    sessions = (
        db.query(StudySession)
        .filter(StudySession.user_id == current_user.id)
        .all()
    )

    subjects = (
        db.query(Subject)
        .filter(Subject.user_id == current_user.id)
        .all()
    )

    subject_map = {subject.id: subject.name for subject in subjects}

    total_sessions = len(sessions)
    total_minutes = sum(session.duration_minutes for session in sessions)
    total_hours = round(total_minutes / 60, 2)

    grouped = defaultdict(lambda: {"total_minutes": 0, "total_sessions": 0})

    for session in sessions:
        grouped[session.subject_id]["total_minutes"] += session.duration_minutes
        grouped[session.subject_id]["total_sessions"] += 1

    subject_items = [
        SubjectAnalyticsItem(
            subject_id=subject_id,
            subject_name=subject_map.get(subject_id, f"Subject {subject_id}"),
            total_minutes=data["total_minutes"],
            total_sessions=data["total_sessions"],
        )
        for subject_id, data in grouped.items()
    ]

    subject_items.sort(key=lambda item: item.total_minutes, reverse=True)

    return MyAnalyticsResponse(
        total_sessions=total_sessions,
        total_minutes=total_minutes,
        total_hours=total_hours,
        xp_total=current_user.xp_total,
        level=current_user.level,
        streak_days=current_user.streak_days,
        active_subjects_count=len(subjects),
        subjects=subject_items,
    )