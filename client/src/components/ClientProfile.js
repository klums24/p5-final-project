import React from 'react';
import { AppBar, Toolbar, Button, Box, Typography } from '@mui/material';
import WorkoutCard from './WorkoutCard';
import WorkoutCollection from './WorkoutCollection';
import { useContext } from 'react';
import { ClientContext } from '../context/clientContext';


function ClientProfile({handleSignOutClick, saveClient, handleEditProfileClick, handleTrainersClick, handleCreateWorkoutClick, handleDeleteAccountClick, handleContactUsClick, workouts, trainers}) {
  const {currentClient} = useContext(ClientContext)

  
  const filteredWorkouts = workouts.filter(workout => workout.client_id === currentClient.id);
  const mappedWorkouts = filteredWorkouts.map (workout => <WorkoutCard key={workout.id} {...workout} trainers={trainers} workouts={workouts}/>)
  

  return (
    <div>
      
      <h2 className="profile-header">Kevin</h2>
      
      <div>
        {mappedWorkouts}
      </div>
    // </div>
  );
}

export default ClientProfile;
