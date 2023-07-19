import React, { useEffect, useState } from 'react';
import { Button, FormControl, InputLabel, MenuItem, Select, Typography } from '@mui/material';
import { useHistory } from 'react-router-dom';

function NewRoutineForm({ currentClient, handleCreateRoutineClick, workouts, trainers, exercises }) {
  const history = useHistory();
  const [selectedWorkout, setSelectedWorkout] = useState('');
  const [selectedExercise, setSelectedExercise] = useState('');

  const handleCreateRoutine = () => {
    const routineData = {
      workout_id: selectedWorkout,
      exercise_id: selectedExercise,
    };

    fetch('/routines', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(routineData),
    })
      .then((response) => {
        if (response.ok) {
          console.log('New routine created successfully');
          history.push('/workouts'); 
        } else {
          console.error('Failed to create routine');
        }
      })
      .catch((error) => {
        console.error('An error occurred while creating the routine:', error);
      });
  };

  return (
    <div className="new-routine-form">
      <Typography variant="h4" component="h2">Create Routine</Typography>
      <FormControl fullWidth>
        <InputLabel id="workout-label">Select Workout</InputLabel>
        <Select
          labelId="workout-label"
          id="workout"
          value={selectedWorkout}
          onChange={(event) => setSelectedWorkout(event.target.value)}
          required
        >
          {workouts.map((workout) => (
            <MenuItem key={workout.id} value={workout.id}>{workout.id}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl fullWidth>
        <InputLabel id="exercise-label">Select Exercise</InputLabel>
        <Select
          labelId="exercise-label"
          id="exercise"
          value={selectedExercise}
          onChange={(event) => setSelectedExercise(event.target.value)}
          required
        >
          {exercises.map((exercise) => (
            <MenuItem key={exercise.id} value={exercise.id}>{exercise.name}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button
        type="button"
        variant="contained"
        color="primary"
        onClick={handleCreateRoutine}
      >
        Create Routine
      </Button>
    </div>
  );
}

export default NewRoutineForm;
