from fastapi import FastAPI, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from pydantic import BaseModel, Field
from typing import Optional, List

from database import engine, Base, get_db
import models

# Initialize database
models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="TaskFlow API")

# --- PYDANTIC SCHEMAS ---

class TaskCreate(BaseModel):
    title: str
    description: Optional[str] = None
    priority: int = Field(default=1, ge=1, le=10)
    category: Optional[str] = None

class TaskUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    done: Optional[bool] = None
    priority: Optional[int] = Field(None, ge=1, le=10)
    category: Optional[str] = None

class TaskResponse(BaseModel):
    id: int
    title: str
    description: Optional[str]
    done: bool
    priority: int
    category: Optional[str]

    class Config:
        from_attributes = True

# --- API ENDPOINTS ---

# Get all tasks with search, status filter, and priority sorting
@app.get("/tasks", response_model=List[TaskResponse])
def get_tasks(
    search: Optional[str] = None,
    status: Optional[str] = Query("all", description="all, done, or undone"),
    sort_priority: Optional[str] = Query(None, description="asc or desc"),
    db: Session = Depends(get_db)
):
    query = db.query(models.Task)

    # Search in both title and description
    if search:
        query = query.filter(
            (models.Task.title.contains(search)) | 
            (models.Task.description.contains(search))
        )

    # Filter by status
    if status == "done":
        query = query.filter(models.Task.done == True)
    elif status == "undone":
        query = query.filter(models.Task.done == False)

    # Sort by priority
    if sort_priority == "asc":
        query = query.order_by(models.Task.priority.asc())
    elif sort_priority == "desc":
        query = query.order_by(models.Task.priority.desc())

    return query.all()

# Create a new task
@app.post("/tasks", response_model=TaskResponse)
def create_task(task_in: TaskCreate, db: Session = Depends(get_db)):
    new_task = models.Task(
        title=task_in.title,
        description=task_in.description,
        priority=task_in.priority,
        category=task_in.category
    )
    db.add(new_task)
    db.commit()
    db.refresh(new_task)
    return new_task

# Toggle task done status
@app.patch("/tasks/{task_id}/toggle", response_model=TaskResponse)
def toggle_task_status(task_id: int, db: Session = Depends(get_db)):
    task = db.query(models.Task).filter(models.Task.id == task_id).first()
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    
    task.done = not task.done
    db.commit()
    db.refresh(task)
    return task

# Update task details (title, description, done, priority, category)
@app.put("/tasks/{task_id}", response_model=TaskResponse)
def update_task(task_id: int, task_in: TaskUpdate, db: Session = Depends(get_db)):
    task = db.query(models.Task).filter(models.Task.id == task_id).first()
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    
    if task_in.title is not None:
        task.title = task_in.title
    if task_in.description is not None:
        task.description = task_in.description
    if task_in.done is not None:
        task.done = task_in.done
    if task_in.priority is not None:
        task.priority = task_in.priority
    if task_in.category is not None:
        task.category = task_in.category

    db.commit()
    db.refresh(task)
    return task

# Delete task
@app.delete("/tasks/{task_id}")
def delete_task(task_id: int, db: Session = Depends(get_db)):
    task = db.query(models.Task).filter(models.Task.id == task_id).first()
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    
    db.delete(task)
    db.commit()
    return {"detail": "Task deleted successfully"}