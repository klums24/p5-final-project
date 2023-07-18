import os
# from config import app, db, api


from flask import Flask, request, make_response, session
from flask_cors import CORS
from flask_migrate import Migrate
from flask_restful import Api, Resource
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData


from models import Workout, Client, Trainer, Exercise, db


from dateutil import parser
# Local imports
# from config import app
BASE_DIR = os.path.abspath(os.path.dirname(__file__))
DATABASE = os.environ.get(
    "DB_URI", f"sqlite:///{os.path.join(BASE_DIR, 'app.db')}")

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.secret_key = "IgnoreMe"



metadata = MetaData(naming_convention={
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
})

migrate = Migrate(app, db)

api=Api(app)
db.init_app(app)



# Instantiate CORS
CORS(app)



@app.route('/')
def index():
    return "<h1>PerfectFit</h1>"

@app.route("/check-user", methods=["GET"])
def check_user():
    if id := session.get("client_id"):
        if client := db.session.get(Client, id):
            return make_response(client.to_dict(), 200)
    return make_response({"error": "Unauthorized"}, 401)

class Signup(Resource):
    def post(self):
        try:
            data = request.get_json()
            new_client = Client(
                first_name=data["first_name"],
                last_name=data["last_name"],
                email=data["email"],
                password_hash=data["password"],
                main_goal=data["main_goal"]
            )
            db.session.add(new_client)
            db.session.commit()
            session["client_id"] = new_client.id
            return make_response(new_client.to_dict(), 201)
        except Exception as e:
            return make_response({"error": str(e)}, 400)

api.add_resource(Signup, "/signup")




class SignIn(Resource):

    def post(self):
        data = request.get_json()
        if client := Client.query.filter(Client.email == data.get("email")).first():
            if client.authenticate(data.get("password")):
                session["client_id"] = client.id
                return make_response(client.to_dict(), 200)
        return make_response({"error": "Unauthorized"}, 401)
    
api.add_resource(SignIn, "/signin")

class SignOut(Resource):
    def delete(self):
        
        session["client_id"] = None
                
        return make_response({}, 204)
        

api.add_resource(SignOut, "/signout")

#workouts route
class Workouts(Resource):

    def get(self):
        workouts = [workout.to_dict() for workout in Workout.query.all()]
        if workouts:
            return make_response(workouts, 200)
        return make_response("Did not retrieve any workouts", 404)


    def post(self):
        try:
            data = request.get_json()
            workout = Workout(
            client_id=session.get("client_id"),
            trainer_id=data.get("trainer_id"),
            workout_type=data.get("workout_type"),
            date=parser.parse(data.get("date")).date(),
            start_time=data.get("start_time"),
            end_time=data.get("end_time"),
        )
            db.session.add(workout)
            db.session.commit()

            return make_response(workout.to_dict(), 201)
        except Exception as e:
            return make_response({"error": str(e)}, 400)
api.add_resource(Workouts, "/workouts")

class WorkoutById(Resource):

    def get(self, id):
        workout = db.session.get(Workout, id)
        if workout:
            return make_response(workout.to_dict(), 200)
        return make_response({"error": "Workout not found"}, 404)
    
    def delete(self, id):
        try:
            workout = db.session.get(Workout, id)
            db.session.delete(workout)
            db.session.commit()
            return make_response({}, 204)
        except Exception as e:
            return make_response({"error": str(e)}, 404)
        
api.add_resource(WorkoutById, "/workouts/<int:id>")        
#trainers route
class Trainers(Resource):

    def get(self):
        trainers = [trainer.to_dict() for trainer in Trainer.query.all()]
        if trainers:
            return make_response(trainers, 200)
        return make_response("Did not find any trainers", 404)

api.add_resource(Trainers, "/trainers")


#client by id
class ClientById(Resource):

    def get(self, id):
        client = db.session.get(Client, id)
        if client:
            return make_response(client.to_dict(), 200)
        return make_response({"error": "Client not found"}, 404)
    
    def delete(self, id):
        try:
            client = db.session.get(Client, id)
            db.session.delete(client)
            db.session.commit()
            return make_response({}, 204)
        except Exception as e:
            return make_response({"error": str(e)}, 404)

    def patch(self, id):
        try:
            data = request.get_json()
            client = db.session.get(Client, id)
            for key, value in data.items():
                setattr(client, key, value)
            db.session.commit()
            return make_response(client.to_dict(), 200)
        except Exception as e:
            return make_response({"error": str(e)}, 400)

api.add_resource(ClientById, "/clients/<int:id>")


class Exercises(Resource):

    def post(self):
        try:
            data = request.get_json()
            exercise = Exercise(
                name=data["name"],
                reps=data["reps"],
                duration=data["duration"],
                difficulty=data["difficulty"],
            )
            db.session.add(exercise)
            db.session.commit()

            return make_response(exercise.to_dict(), 201)
        except Exception as e:
            return make_response({"error": str(e)}, 400)

api.add_resource(Exercises, "/exercises")


if __name__ == '__main__':
    app.run(port=5555, debug=True)