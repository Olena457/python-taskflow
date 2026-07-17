import random
from database import SessionLocal
import models

# data 
TITLES = [
    "Setup frontend project", "Fix navigation bug", "Review pull requests",
    "Update API documentation", "Buy groceries", "Call the bank",
    "Schedule dentist appointment", "Read a new tech book", "Go to the gym",
    "Plan weekend trip", "Pay utility bills", "Clean the workspace",
    "Order dog food", "Learn Tailwind CSS tricks", "Deploy app to Vercel"
]
CATEGORIES = ["Work", "Personal", "Health", "Home", None]
DESCRIPTIONS = [
    "Needs to be done ASAP", "Low priority task", "Check notes first",
    "Ask team for help if needed", None
]

def seed_data():
    db = SessionLocal()
    
    # Check if database is already seeded
    if db.query(models.Task).count() > 0:
        print("Database already contains tasks. Seeding skipped.")
        db.close()
        return
        
    print("Seeding database with 15 tasks...")
    
    for i in range(15):
        new_task = models.Task(
            title=TITLES[i],
            description=random.choice(DESCRIPTIONS),
            done=random.choice([True, False]),
            priority=random.randint(1, 10),
            category=random.choice(CATEGORIES)
        )
        db.add(new_task)
        
    db.commit()
    db.close()
    print("Database successfully seeded!")

if __name__ == "__main__":
    seed_data()