from sqlalchemy import Column, Integer, String, Boolean
from database import Base

# Task database model
class Task(Base):
    __tablename__ = "tasks"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True, nullable=False)
    description = Column(String, nullable=True)  
    done = Column(Boolean, default=False)
    priority = Column(Integer, default=1)  
    category = Column(String, nullable=True) 