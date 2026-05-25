from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.db.dependencies import get_db
from app.models.user import User

router = APIRouter(prefix="/leaderboard", tags=["Leaderboard"])


@router.get("/")
def get_leaderboard(db: Session = Depends(get_db)):
    users = (
        db.query(User)
        .order_by(User.xp_total.desc(), User.level.desc())
        .all()
    )

    return [
        {
            "id": user.id,
            "username": user.username,
            "full_name": user.full_name,
            "xp_total": user.xp_total,
            "level": user.level,
        }
        for user in users
    ]