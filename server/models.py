from sqlalchemy_serializer import SerializerMixin


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

    serialize_only = ("id", "first_name", "last_name", "email")
    serialize_rules = ("-workouts.client", "-trainers.clients")
#Create Trainer class
#first name, last name, email, password, specialization, bio
class Trainer(db.Model, SerializerMixin):
    __tablename__ = "trainers"

    id = db.Column(db.Integer, primary_key= True)
    first_name = db.Column(db.String, nullable=False)
    last_name = db.Column(db.String, nullable=False)
    email = db.Column(db.String, nullable=False, unique=True)
    password = db.Column(db.String, nullable=False)
    specialization = db.Column(db.String, nullable=False)
    bio = db.Column(db.String, nullable=False)

    clients = association_proxy("workouts", "client")
    workouts = db.relationship("Workout", back_populates="trainer")

    serialize_only = ("id", "first_name", "last_name", "email", "specialization", "bio")
    serialize_rules = ("-workouts.trainer", "-clients.trainers")
#Create Workout class
#id, client_id, trainer_id, workout_type, date, start_time, end_time
class Workout(db.Model, SerializerMixin):
    __tablename__ = "workouts"

    id = db.Column(db.Integer, primary_key= True)
    client_id = db.Column(db.Integer, db.ForeignKey("clients.id"))
    trainer_id = db.Column(db.Integer, db.ForeignKey("trainers.id"))

    workout_type = db.Column(db.String, nullable=False)
    date = db.Column(db.Date, nullable=False)
    start_time = db.Column(db.String, nullable=False)
    end_time = db.Column(db.String, nullable=False)

    client = db.relationship("Client", back_populates="workouts")
    trainer = db.relationship("Trainer", back_populates="workouts")

    routines = db.relationship("Routine", back_populates="workout")

    serialize_only = ("id", "client_id", "trainer_id", "workout_type", "date", "start_time", "end_time")
    serialize_rules = ("-client.workouts", "-trainer.workouts")
    #is association proxy to exercise needed here?


#Create Routine class
#workout_id, exercise_id
class Routine(db.Model, SerializerMixin):

    __tablename__ = "routines"

    id = db.Column(db.Integer, primary_key=True)
    workout_id = db.Column(db.Integer, db.ForeignKey("workouts.id"))
    exercise_id = db.Column(db.Integer, db.ForeignKey("exercises.id"))

    workout = db.relationship("Workout", back_populates="routines")
    exercise = db.relationship("Exercise", back_populates="routines")






#Create Exercise class
#name, reps, duration, difficulty
class Exercise(db.Model, SerializerMixin):

    __tablename__ = "exercises"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    reps = db.Column(db.Integer)
    duration = db.Column(db.Integer)
    difficulty = db.Column(db.String)

    routines = db.relationship("Routine", back_populates="exercise")

    #do i need associatyion proxy to workout here?