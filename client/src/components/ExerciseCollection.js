import React, { useContext } from 'react';
import ExerciseCard from './ExerciseCard';
import './style.css';
import { ClientContext } from '../context/clientContext';

function ExerciseCollection({ exercises, workouts, routines }) {
  const { currentClient } = useContext(ClientContext);

  const filteredWorkouts = workouts.filter(workout => workout.client_id === currentClient.id)
  const workoutIdsForCurrentClient = filteredWorkouts.map(workout => workout.id)

  const routinesForCurrentClient = routines.filter(routine =>
    workoutIdsForCurrentClient.includes(routine.workout_id)
  );

  const exerciseIdsForCurrentClient = routinesForCurrentClient.map(routine => routine.exercise_id);

  const filteredExercises = exercises.filter(exercise =>
    exerciseIdsForCurrentClient.includes(exercise.id)
  );

  const mappedExercises = filteredExercises.map(exercise => (
    <ExerciseCard key={exercise.id} {...exercise} />
  ));

  return (
    <div>
      <h2>Your exercises:</h2>
      <div className="container">{mappedExercises}</div>
    </div>
  );
}

export default ExerciseCollection;
