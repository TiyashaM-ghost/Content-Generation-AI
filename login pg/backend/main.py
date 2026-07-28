from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

import models
import schemas

from database import engine
from database import Base
from database import SessionLocal

from auth import hash_password
from auth import verify_password

Base.metadata.create_all(bind=engine)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def get_db():

    db = SessionLocal()

    try:
        yield db
    finally:
        db.close()


@app.get("/")
def home():

    return {
        "message": "Backend Running Successfully"
    }


@app.post("/signup")
def signup(user: schemas.UserSignup,
           db: Session = Depends(get_db)):

    existing = db.query(models.User).filter(
        models.User.email == user.email
    ).first()

    if existing:

        raise HTTPException(
            status_code=400,
            detail="Email already exists"
        )

    new_user = models.User(

        username=user.username,

        email=user.email,

        password=hash_password(user.password)

    )

    db.add(new_user)

    db.commit()

    db.refresh(new_user)

    return {

        "message": "Signup Successful"

    }


@app.post("/login")
def login(user: schemas.UserLogin,
          db: Session = Depends(get_db)):

    db_user = db.query(models.User).filter(
        models.User.email == user.email
    ).first()

    if db_user is None:

        raise HTTPException(
            status_code=401,
            detail="Invalid Email"
        )

    if not verify_password(
            user.password,
            db_user.password):

        raise HTTPException(
            status_code=401,
            detail="Incorrect Password"
        )

    return {

        "message": "Login Successful",

        "username": db_user.username

    }