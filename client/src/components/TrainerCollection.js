import React from "react"
import { AppBar, Toolbar, Button, Box, Typography } from "@mui/material";
import TrainerCard from "./TrainerCard";
import "./style.css"
import { Link } from "react-router-dom";

function TrainerCollection({trainers, handleSignOutClick, handleEditProfileClick, handleTrainersClick, handleCreateWorkoutClick, handleDeleteAccountClick}) {
    const mappedTrainers = trainers.map (trainer => <TrainerCard key={trainer.id} {...trainer}/>)

    return (
        <div>
            <div class="container">
                {mappedTrainers}
            </div>
        </div>
  )
}

export default TrainerCollection