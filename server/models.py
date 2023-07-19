from sqlalchemy_serializer import SerializerMixin


from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from sqlalchemy.orm import validates
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy_serializer import SerializerMixin
from flask_bcrypt import Bcrypt
import re
bcrypt = Bcrypt()


metadata = MetaData(naming_convention={
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
})

db = SQLAlchemy(metadata=metadata)

#Create Client class
#first name, last name, email, password
class Client(db.Model, SerializerMixin):
    __tablename__ = "clients"

    id = db.Column(db.Integer, primary_key= True)
    first_name = db.Column(db.String)
    last_name = db.Column(db.String, nullable=False)
    email = db.Column(db.String, nullable=False, unique=True)
    _password_hash = db.Column(db.String, nullable=False)
    main_goal = db.Column(db.String, nullable=False)
    trainers = association_proxy("workouts", "trainer")
    workouts = db.relationship("Workout", back_populates="client")

    serialize_only = ("id", "first_name", "last_name", "email")
    serialize_rules = ("-workouts.client", "-trainers.clients")

    @hybrid_property
    def password_hash(self):
        return self._password_hash

    @password_hash.setter
    def password_hash(self, password):
        password_hash = bcrypt.generate_password_hash(password.encode("utf-8"))
        self._password_hash = password_hash.decode("utf-8")

    def authenticate(self, password):
        return bcrypt.check_password_hash(self._password_hash, password.encode("utf-8"))
    
    @validates("first_name")
    def validate_first_name(self, key, first_name):
        if not first_name or not 3 < len(first_name) < 21:
            raise ValueError("First name must be at least 3 letters and cannot exceed 20 letters")
    @validates("last_name")
    def validate_last_name(self, key, last_name):
        if not last_name or not 2 < len(last_name) < 21:
          raise ValueError("Last name must be at least 2 letters and cannot exceed 20 letters")
        return last_name

    @validates("email_address")
    def validate_email(self, key, current_email_address):
        regex = re.compile(r'([A-Za-z0-9]+[.-_])*[A-Za-z0-9]+@[A-Za-z0-9-]+(.[A-Z|a-z]{2,})+')
        if re.fullmatch(regex, current_email_address):
            return current_email_address
        return ValueError("The email provided is invalid")
    
    @validates("password")
    def validate_password(self, key, password):
        regex = re.compile(r'^(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z])(?=\D*\d)(?=.*?[\!\#\@\$\%\&\/\(\)\=\?\*\-\+\-\_\.\:\;\,\]\[\{\}\^])[A-Za-z0-9\!\#\@\$\%\&\/\(\)\=\?\*\-\+\-\_\.\:\;\,\]\[\{\}\^]{8,60}$')
        if re.fullmatch(regex, password):
            return password        
        return ValueError("The password provided is invalid")
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
    @validates("first_name")
    def validate_first_name(self, key, first_name):
        if not first_name or not 3 < len(first_name) < 21:
            raise ValueError("First name must be at least 3 letters and cannot exceed 20 letters")
    @validates("last_name")
    def validate_last_name(self, key, last_name):
        if not last_name or not 2 < len(last_name) < 21:
          raise ValueError("Last name must be at least 2 letters and cannot exceed 20 letters")
        return last_name

    @validates("email_address")
    def validate_email(self, key, current_email_address):
        regex = re.compile(r'([A-Za-z0-9]+[.-_])*[A-Za-z0-9]+@[A-Za-z0-9-]+(.[A-Z|a-z]{2,})+')
        if re.fullmatch(regex, current_email_address):
            return current_email_address
        return ValueError("The email provided is invalid")
    
    @validates("password")
    def validate_password(self, key, password):
        regex = re.compile(r'^(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z])(?=\D*\d)(?=.*?[\!\#\@\$\%\&\/\(\)\=\?\*\-\+\-\_\.\:\;\,\]\[\{\}\^])[A-Za-z0-9\!\#\@\$\%\&\/\(\)\=\?\*\-\+\-\_\.\:\;\,\]\[\{\}\^]{8,60}$')
        if re.fullmatch(regex, password):
            return password        
        return ValueError("The password provided is invalid")
    
    

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
    
    @validates("workout_type")
    def validate_workout_type(self, key, workout_type):
        if not workout_type or not len(workout_type) < 21:
            raise ValueError("Please describe your workout type in less than 20 characters") 
        return workout_type
#Create Routine class
#workout_id, exercise_id
class Routine(db.Model, SerializerMixin):

    __tablename__ = "routines"

    id = db.Column(db.Integer, primary_key=True)
    workout_id = db.Column(db.Integer, db.ForeignKey("workouts.id"))
    exercise_id = db.Column(db.Integer, db.ForeignKey("exercises.id"))

    workout = db.relationship("Workout", back_populates="routines")
    exercise = db.relationship("Exercise", back_populates="routines")

    serialize_rules = ("-workout.routines", "-exercise.routines")




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