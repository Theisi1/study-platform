from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.db.dependencies import get_db
from app.models.subject import Subject
from app.schemas.subject import SubjectCreate, SubjectResponse
from app.core.dependencies import get_current_user
from app.models.user import User

router = APIRouter(prefix="/subjects", tags=["Subjects"])


@router.get("/", response_model=list[SubjectResponse])
def get_subjects(db: Session = Depends(get_db)):
    return db.query(Subject).all()


@router.post("/", response_model=SubjectResponse, status_code=201)
def create_subject(
    payload: SubjectCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    subject = Subject(
        name=payload.name,
        user_id=current_user.id,
    )

    db.add(subject)
    db.commit()
    db.refresh(subject)

    return subject