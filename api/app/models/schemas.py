from typing import List
from pydantic import BaseModel

class Photo(BaseModel):
    name: str
    type: str
    id: str
    width: int
    height: int

    class Config:
        orm_mode = True

class PhotoList(BaseModel):
    photos: List[Photo]
    count: int
