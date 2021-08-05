from uuid import uuid4
from datetime import datetime

from sqlalchemy import Column, String
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.dialects.postgresql import BYTEA
from sqlalchemy.sql.sqltypes import DateTime, Integer

Base = declarative_base()

class Photo(Base):
    __tablename__ = 'photos'

    id: str = Column(String, primary_key=True, default=lambda: str(uuid4()))
    name: str = Column(String, nullable=False, index=True)
    type: str = Column(String, nullable=False)
    data: bytes = Column(BYTEA, nullable=False)
    width: int = Column(Integer, nullable=False)
    height: int = Column(Integer, nullable=False)
    date_uploaded: datetime = Column(DateTime, default=datetime.now)
