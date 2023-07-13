from app import app
from models import Client, Trainer, Workout, Routine, Exercise, db
from datetime import date

if __name__ == '__main__':

    with app.app_context():

        Client.query.delete()
        Trainer.query.delete()
        Workout.query.delete()
        Routine.query.delete()
        Exercise.query.delete()

        #create some clients
        c1 = Client(first_name = "David", last_name = "Slingshot", email = "goliathslayer@gmail.com", _password_hash = "wwww", main_goal = "Weight Loss")
        c2 = Client(first_name = "Jane", last_name = "Smith", email = "janesmith2@gmail.com", _password_hash = "ssss", main_goal = "Increase Strength")
        c3 = Client(first_name = "Sarah", last_name = "Marshall", email = "dontforgetme@gmail.com", _password_hash = "wwww", main_goal = "Improve cardio")

        clients = [c1, c2, c3]
        db.session.add_all(clients)
        db.session.commit()

        #create some trainers
        t1 = Trainer(first_name = "John", last_name = "Cena", email = "ucantseeme@yahoo.com", password = "ssss", specialization = "weightlifting", bio = "5 years experience as a personal trainer and bodybuilder")

        t2 = Trainer(
            first_name = "Arnold", 
            last_name = "Worstersher", 
            email = "getinthechoppa@aol.com", 
            password = "wwww", 
            specialization = "cardio", 
            bio = "Runs 20 miles a week"
        )

        t3 = Trainer(
            first_name = "Bruce", 
            last_name = "Almighty", 
            email = "pearlygates@msn.com", 
            password = "wwww", 
            specialization = "pilates", 
            bio = "Focuses on meditation and muscular balance"
        )

        trainers = [t1, t2, t3]
        db.session.add_all(trainers)
        db.session.commit()

        # Create some exercises
        e1 = Exercise(name="Deadlift", reps=10, duration=20, difficulty="Moderate")
        e2 = Exercise(name="Pilates", reps=None, duration=30, difficulty="Moderate")
        e3 = Exercise(name="Running", reps=None, duration=15, difficulty="Easy")
        e4 = Exercise(name="Squat", reps=20, duration=30, difficulty="Hard")
        e5 = Exercise(name="Yoga", reps=None, duration=15, difficulty="Easy")
        e6 = Exercise(name="Jumprope", reps=20, duration=5, difficulty="Moderate")

        exercises = [e1, e2, e3, e4]
        db.session.add_all(exercises)
        db.session.commit()

        # Create some workouts with routines
        w1 = Workout(client=c1, trainer=t1, workout_type="Weightlifting", date=date(2023, 7, 3), start_time="10:00",end_time="11:00")
        w2 = Workout(client=c2, trainer=t2, workout_type="Cardio", date=date(2023, 7, 2), start_time="09:00",
                     end_time="10:00")
        w3 = Workout(client=c3, trainer=t3, workout_type="Stability", date=date(2023, 7, 1), start_time="11:00",
                     end_time="12:00")

        workouts = [w1, w2, w3]
        db.session.add_all(workouts)
        db.session.commit()

        # Create routines
        r1 = Routine(workout_id=w1.id, exercise_id=e1.id)
        r2 = Routine(workout_id=w1.id, exercise_id=e4.id)
        r3 = Routine(workout_id=w2.id, exercise_id=e3.id)
        r4 = Routine(workout_id=w2.id, exercise_id=e6.id)
        r5 = Routine(workout_id=w3.id, exercise_id=e2.id)
        r6 = Routine(workout_id=w3.id, exercise_id=e5.id)
        
       

        routines = [r1, r2, r3, r4, r5, r6]
        db.session.add_all(routines)
        db.session.commit()