import React from "react"
import WorkoutCard from "./WorkoutCard"
import "./style.css"
import { useContext } from "react";
import { ClientContext } from "../context/clientContext";
import ExerciseCollection from "./ExerciseCollection";

function WorkoutCollection({workouts, trainers, handleDeleteWorkout}) {
    const {currentClient} = useContext(ClientContext)
    
    const filteredWorkouts = workouts.filter(workout => workout.client_id === currentClient.id);
    const mappedWorkouts = filteredWorkouts.map (workout => <WorkoutCard key={workout.id} {...workout} trainers={trainers} workouts={workouts} handleDeleteWorkout={handleDeleteWorkout}/>)
    
    return (
        <div>
        <h2>Your workouts:</h2>
        <div class="container">
            {mappedWorkouts}
            {/* <ExerciseCollection /> */}
        </div>
    </div>
    )
    
}

export default WorkoutCollection