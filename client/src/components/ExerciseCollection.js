import React, { useContext } from 'react';
import ExerciseCard from './ExerciseCard';
import './style.css';
import { ClientContext } from '../context/clientContext';

function ExerciseCollection({ exercises, workouts, routines }) {
  const { currentClient } = useContext(ClientContext);

  // Find all the workouts associated with the currentClient
  const filteredWorkouts = workouts.filter(workout => workout.client_id === currentClient.id);

  // Extract all the workout_ids from the filtered workouts
  const workoutIdsForCurrentClient = filteredWorkouts.map(workout => workout.id);

  // Find all the routines associated with the workout_ids
  const routinesForCurrentClient = routines.filter(routine =>
    workoutIdsForCurrentClient.includes(routine.workout_id)
  );

  // Extract all the exercise_ids from the found routines
  const exerciseIdsForCurrentClient = routinesForCurrentClient.map(routine => routine.exercise_id);

  // Filter exercises that are associated with the found exercise_ids
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
