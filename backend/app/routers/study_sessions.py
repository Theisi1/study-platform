from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.db.dependencies import get_db
from app.models.study_session import StudySession
from app.models.user import User
from app.schemas.study_session import StudySessionCreate, StudySessionResponse
from app.core.dependencies import get_current_user
from app.models.user import User

router = APIRouter(prefix="/study-sessions", tags=["Study Sessions"])


@router.get("/", response_model=list[StudySessionResponse])
def get_study_sessions(db: Session = Depends(get_db)):
    return db.query(StudySession).all()


@router.post("/", response_model=StudySessionResponse, status_code=201)
def create_study_session(
    payload: StudySessionCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    xp = payload.duration_minutes // 10

    session = StudySession(
        user_id=current_user.id,
        subject_id=payload.subject_id,
        duration_minutes=payload.duration_minutes,
        study_method=payload.study_method,
        xp_earned=xp,
    )

    db.add(session)

    current_user.xp_total += xp
    current_user.level = current_user.xp_total // 100 + 1

    db.commit()
    db.refresh(session)

    return session