import React from 'react';
import { useEffect, useState } from "react";
import { Switch, Route, useHistory } from "react-router-dom";

import NewClientForm from './NewClientForm';
import SigninForm from './SignInForm';
import ClientProfile from './ClientProfile'
import EditProfileForm from './EditProfileForm';
import TrainerCollection from './TrainerCollection';
import NewExerciseForm from './NewExerciseForm';

import ContactUsForm from './ContactUsForm';
import NewWorkoutForm from './NewWorkoutForm';
import WorkoutCollection from './WorkoutCollection';
import Chat from './Chat';
import NewRoutineForm from './NewRoutineForm';
import NavBar from './NavBar';
import { ClientContext } from '../context/clientContext';
import NewRoutineForm from './NewRoutineForm';
import Chat from './Chat'





function App() {

    const history = useHistory();
    
    
    const [trainers, setTrainers] = useState([])
    const [workouts, setWorkouts] = useState([])
    const [exercises, setExercises] = useState([])

    useEffect(() => {
        fetch("/trainers")
        .then(response => {
            if (response.ok) {
                response.json()
                .then(data => {
                    setTrainers(data)
                    console.log(data)
                })
            }
        })
    }, [])

    useEffect(() => {
      fetch("/workouts")
      .then(response => {
          if (response.ok) {
              response.json()
              .then(data => {
                  setWorkouts(data)

              })
          }
      })
    }, [])

    useEffect(() => {
      fetch("/exercises")
      .then(response => {
          if (response.ok) {
              response.json()
              .then(data => {
                  setExercises(data)

              })
          }
      })
    }, [])

    useEffect(() => {
      fetch("/exercises")
      .then(response => {
          if (response.ok) {
              response.json()
              .then(data => {
                  setExercises(data)

              })
          }
      })
    }, [])

    
   
    const handleAddWorkout = (new_workout) => {
      setWorkouts([...workouts, new_workout])
    }
    

    const handleTrainersClick = () => {
        history.push('/trainers');
    };
    
    const handleCreateWorkoutClick = () => {
        history.push('/create-exercise');
    };

    const handleContactUsClick = () => {
        history.push('/contact-us')
    }
    
    
    
    return (
        <div>
          <NavBar handleTrainersClick={handleTrainersClick} handleCreateWorkoutClick={handleCreateWorkoutClick} handleContactUsClick={handleContactUsClick} />
          <Switch>
            
              <Route exact path="/">
                <ClientProfile
                  handleTrainersClick={handleTrainersClick}
                  handleCreateWorkoutClick={handleCreateWorkoutClick}
                  handleContactUsClick={handleContactUsClick}
                  handleCreateRoutineClick={handleCreateRoutineClick}
                  workouts={workouts}
                  trainers={trainers}
                />
              </Route>
              <Route path="/clients/:id/edit-profile">
                <EditProfileForm 
                  handleTrainersClick={handleTrainersClick}
                  handleCreateWorkoutClick={handleCreateWorkoutClick}
                />
              </Route>
              <Route path="/trainers">
                <TrainerCollection
                  trainers={trainers}
                  handleTrainersClick={handleTrainersClick}
                />
              </Route>
              <Route path = "/workouts">
                <WorkoutCollection 
                workouts={workouts} 
                trainers={trainers}
                handleTrainersClick={handleTrainersClick}
                />
              </Route>
              <Route path="/create-workout/:trainerId">
                <NewWorkoutForm trainers={trainers} handleAddWorkout={handleAddWorkout}/>
              </Route>
              <Route path="/create-routine">
                <NewRoutineForm currentClient={currentClient} handleCreateRoutineClick={handleCreateRoutineClick} workouts={workouts} trainers={trainers} exercises={exercises}/>
              </Route>
              <Route path="/create-routine">
                <NewRoutineForm currentClient={currentClient} handleCreateRoutineClick={handleCreateRoutineClick} workouts={workouts} trainers={trainers} exercises={exercises}/>
              </Route>
              <Route path="/create-exercise">
                <NewExerciseForm />
              </Route>
              <Route path="/chat">
                <Chat />
              </Route>
              <Route exact path="/">
                <ClientProfile
                  handleTrainersClick={handleTrainersClick}
                  handleCreateWorkoutClick={handleCreateWorkoutClick}
                  handleContactUsClick={handleContactUsClick}
                  workouts={workouts}
                  trainers={trainers}
                />
              </Route>
          </Switch>
          
        </div>
      );
      
}

export default App;
