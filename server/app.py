import os
# from config import app, db, api


from flask import Flask, request, make_response, session
from flask_cors import CORS
from flask_migrate import Migrate
from flask_restful import Api, Resource
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData


from models import Workout, Client, Trainer, db

# Local imports
# from config import app
BASE_DIR = os.path.abspath(os.path.dirname(__file__))
DATABASE = os.environ.get(
    "DB_URI", f"sqlite:///{os.path.join(BASE_DIR, 'app.db')}")

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.secret_key = "SuperSecretKey"
app.json.compact = False


metadata = MetaData(naming_convention={
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
})

migrate = Migrate(app, db)

api=Api(app, prefix="/api/v1")
db.init_app(app)

# Instantiate CORS
CORS(app)


#workouts route
class Workouts(Resource):

    def get(self):
        workouts = [workout.to_dict() for workout in Workout.query.all()]
        if workouts:
            return make_response(workouts, 200)
        return make_response("Did not retrieve any workouts", 404)

api.add_resource(Workouts, "/workouts")

#trainers route
class Trainers(Resource):

    def get(self):
        trainers = [trainer.to_dict() for trainer in Trainer.query.all()]
        if trainers:
            return make_response(trainers, 200)
        return make_response("Did not find any trainers", 404)

api.add_resource(Trainers, "/trainers")