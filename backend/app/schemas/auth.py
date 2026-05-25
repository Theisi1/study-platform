from pydantic import BaseModel, EmailStr, Field


class RegisterRequest(BaseModel):
    email: EmailStr
    username: str
    full_name: str
    university: str
    career: str
    password: str = Field(min_length=8, max_length=72)


class LoginRequest(BaseModel):
    email: EmailStr
    password: str = Field(min_length=8, max_length=72)


class TokenResponse(BaseModel):
    access_token: str
    token_type: str


class AuthUserResponse(BaseModel):
    id: int
    email: EmailStr
    username: str
    full_name: str
    university: str
    career: str
    xp_total: int
    level: int
    streak_days: int

    model_config = {"from_attributes": True}