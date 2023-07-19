import React from "react"
import WorkoutCard from "./WorkoutCard"
import { AppBar, Toolbar, Button, Box, Typography } from "@mui/material";
import "./style.css"
import { Link } from "react-router-dom";
import { useContext } from "react";
import { ClientContext } from "../context/clientContext";

function WorkoutCollection({handleSignOutClick, handleEditProfileClick, handleTrainersClick, handleCreateWorkoutClick, handleDeleteAccountClick, workouts, trainers}) {
    const {currentClient} = useContext(ClientContext)
    const filteredWorkouts = workouts.filter(workout => workout.client_id === currentClient.id);
    const mappedWorkouts = filteredWorkouts.map (workout => <WorkoutCard key={workout.id} {...workout} trainers={trainers} workouts={workouts}/>)
    return (
        <div>
        <h2>Your workouts:</h2>
        <div class="container">
            {mappedWorkouts}
        </div>
    </div>
    )
    
}

export default WorkoutCollection