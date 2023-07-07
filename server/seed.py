from app import app
from models import Client, Trainer, Workout, db

if __name__ == '__main__':

    with app.app_context():

        Client.query.delete()
        Trainer.query.delete()
        Workout.query.delete()

        #create some clients
        c1 = Client(first_name = "David", last_name = "Slingshot", email = "goliathslayer@gmail.com", password = "wwww")
        c2 = Client(first_name = "Jane", last_name = "Smith", email = "janesmith2@gmail.com", password = "ssss")
        c3 = Client(first_name = "Sarah", last_name = "Marshall", email = "dontforgetme@gmail.com", password = "wwww")

        clients = [c1, c2, c3]
        db.session.add_all(clients)
        db.session.commit()

        #create some trainers
        t1 = Trainer(
            first_name = "John", 
            last_name = "Cena", 
            email = "ucantseeme@yahoo.com", 
            password = "ssss", 
            specialization = "weightlifting", 
            bio = "5 years experience as a personal trainer and bodybuilder"
        )

        t2 = Trainer(
            first_name = "Arnold", 
            last_name = "Worstersher", 
            email = "getinthechoppa@aol.com", 
            password = "wwww", 
            specialization = "cardio", 
            bio = "Runs 20 miles a week"
        )

        t2 = Trainer(
            first_name = "Bruce", 
            last_name = "Almighty", 
            email = "pearlygates@msn.com", 
            password = "wwww", 
            specialization = "pilates", 
            bio = "Focuses on meditation and muscular balance"
        )