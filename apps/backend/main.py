


from fastapi import FastAPI, Depends, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware 
from sqlalchemy.orm import Session
from pydantic import BaseModel, Field
from typing import Optional, List

from database import engine, get_db
import models

# Initialize database
models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="TaskFlow API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000", 
        "http://127.0.0.1:3000", 
        "http://192.168.1.3:3000"
    ], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"], 
)
# --- PYDANTIC SCHEMAS ---

class TaskCreate(BaseModel):
    title: str
    description: Optional[str] = None
    priority: int = Field(default=1, ge=1, le=10)
    category: Optional[str] = None
    due_date: Optional[str] = None
    status: Optional[str] = "todo"

class TaskUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    status: Optional[str] = None
    priority: Optional[int] = Field(None, ge=1, le=10)
    category: Optional[str] = None
    due_date: Optional[str] = None

class TaskResponse(BaseModel):
    id: int
    title: str
    description: Optional[str]
    status: str
    priority: int
    category: Optional[str]
    due_date: Optional[str] = None

    class Config:
        from_attributes = True

# --- API ENDPOINTS ---

@app.get("/tasks", response_model=List[TaskResponse])
def get_tasks(
    search: Optional[str] = None,
    status: Optional[str] = Query("all", description="all, undone, in_progress, done"),
    category: Optional[str] = None, 
    sort_priority: Optional[str] = Query(None, description="asc or desc"),
    db: Session = Depends(get_db)
):
    query = db.query(models.Task)

    if search:
        query = query.filter(
            (models.Task.title.contains(search)) | 
            (models.Task.description.contains(search))
        )

    if status and status != "all":
        query = query.filter(models.Task.status == status)

    # Filter by category
    if category:
        query = query.filter(models.Task.category == category)

    # Sort by priority
    if sort_priority == "asc":
        query = query.order_by(models.Task.priority.asc())
    elif sort_priority == "desc":
        query = query.order_by(models.Task.priority.desc())

    return query.all()

@app.post("/tasks", response_model=TaskResponse)
def create_task(task_in: TaskCreate, db: Session = Depends(get_db)):
    new_task = models.Task(
        title=task_in.title,
        description=task_in.description,
        status=task_in.status,
        priority=task_in.priority,
        category=task_in.category,
        due_date=task_in.due_date  
    )
    db.add(new_task)
    db.commit()
    db.refresh(new_task)
    return new_task

@app.patch("/tasks/{task_id}", response_model=TaskResponse)
def update_task(task_id: int, task_in: TaskUpdate, db: Session = Depends(get_db)):
    task = db.query(models.Task).filter(models.Task.id == task_id).first()
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    
    if task_in.title is not None:
        task.title = task_in.title
    if task_in.description is not None:
        task.description = task_in.description
    if task_in.status is not None:
        task.status = task_in.status
    if task_in.priority is not None:
        task.priority = task_in.priority
    if task_in.category is not None:
        task.category = task_in.category
    if task_in.due_date is not None:        
        task.due_date = task_in.due_date    

    db.commit()
    db.refresh(task)
    return task

@app.delete("/tasks/{task_id}")
def delete_task(task_id: int, db: Session = Depends(get_db)):
    task = db.query(models.Task).filter(models.Task.id == task_id).first()
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    
    db.delete(task)
    db.commit()
    return {"detail": "Task deleted successfully"}

@app.get("/tasks/{task_id}", response_model=TaskResponse)
def get_task(task_id: int, db: Session = Depends(get_db)):
    task = db.query(models.Task).filter(models.Task.id == task_id).first()
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    return task