import datetime
from pydantic import BaseModel, Field
from typing import Optional

class Movie(BaseModel):
    id: int
    title: str
    overview: str
    year: int
    rating: float
    genre: str

class MovieCreate(BaseModel):
    id: int
    title: str = Field(max_length=60)
    overview: Optional[str] = Field(max_length=250)
    year: int = Field(le=datetime.date.today().year, ge=1900)
    rating: float = Field(ge=0, le=10)
    genre: str = Field(max_length=40)