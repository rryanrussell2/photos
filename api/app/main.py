from fastapi.exceptions import HTTPException
from fastapi.param_functions import Query
from sqlalchemy.sql.expression import desc
from app.models.schemas import Photo, PhotoList
from app.models.orm import Photo as PhotoDB
from app.db import create_db, get_db
from typing import List
from PIL import Image
from io import BytesIO

from fastapi import FastAPI, Depends, File, UploadFile, Response, status
from fastapi.middleware.cors import CORSMiddleware

from sqlalchemy.exc import NoResultFound
from sqlalchemy.orm.session import Session

app = FastAPI()

origins = [
    "http://localhost:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

create_db()

@app.get("/")
def read_root():
    return "Hello, world."

@app.get('/photos', response_model=PhotoList)
def search_photos(
    name: str, 
    db: Session = Depends(get_db), 
    from_ = Query(0, alias='from'), 
    size = Query(12)
):
    query = db.query(PhotoDB).filter(PhotoDB.name.ilike(f'%{name}%'))
    count = query.count() 
    return PhotoList(
        count=count,
        photos=query.order_by(desc(PhotoDB.date_uploaded)).limit(size).offset(from_).all()
    )

@app.post('/photos', response_model=Photo, status_code=status.HTTP_201_CREATED)
def create_photo(file: UploadFile = File(...), db: Session = Depends(get_db)):
    if not file.content_type.lower().startswith('image'):
        raise HTTPException(status.HTTP_400_BAD_REQUEST, 'Only images accepted.')

    image_data = file.file.read()
    width, height = Image.open(BytesIO(image_data)).size
    new_photo = PhotoDB(name=file.filename, type=file.content_type, data=image_data, width=width, height=height)
    db.add(new_photo)
    db.commit()
    db.refresh(new_photo)
    return new_photo

@app.get('/photos/{photo_id}')
def get_photo_data(photo_id: str, db: Session = Depends(get_db)):
    try:
        photo = db.query(PhotoDB).filter(PhotoDB.id == photo_id).one()
        return Response(photo.data, media_type=photo.type)
    except NoResultFound:
        raise HTTPException(status.HTTP_404_NOT_FOUND)
