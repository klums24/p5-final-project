from sqlalchemy_serializer import SerializerMixin
from config import db

from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from sqlalchemy.orm import validates
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy_serializer import SerializerMixin
import re



metadata = MetaData(naming_convention={
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
})

db = SQLAlchemy(metadata=metadata)

#Create Client class
#first name, last name, email, password
class Client(db.Model, SerializerMixin):
    __tablename__ = "clients"

    id = db.Column(db.Integer, primary_key= True)
    first_name = db.Column(db.String, nullable=False)
    last_name = db.Column(db.String, nullable=False)
    email = db.Column(db.String, nullable=False, unique=True)
    password = db.Column(db.String, nullable=False)

    trainers = association_proxy("workouts", "trainer")
    workouts = db.relationship("Workout", back_populates="client")

#Create Trainer class


#Crate Workout class
#id, client_id, trainer_id, workout_type, date, start_time, end_time
class Workout(db.Model, SerializerMixin):
    __tablename__ = "workouts"

    id = db.Column(db.Integer, primary_key= True)
    client_id = db.Column(db.Integer, db.ForeignKey("clients.id"))
    trainer_id = db.Column(db.Integer, db.ForeignKey("trainers.id"))

    workout_type = db.Column(db.String, nullable=False)
    date = db.Column(db.Date, nullable=False)
    start_time = db.Column(db.Time, nullable=False)
    end_time = db.Column(db.Time, nullable=False)

    client = db.relationship("Client", back_populates="workouts")
    trainer = db.relationship("Trainer", back_populates="workouts")
    