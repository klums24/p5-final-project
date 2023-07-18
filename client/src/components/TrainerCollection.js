import React from "react"
import { AppBar, Toolbar, Button, Box, Typography } from "@mui/material";
import TrainerCard from "./TrainerCard";
import "./style.css"
import { Link } from "react-router-dom";

function TrainerCollection({trainers, handleSignOutClick, handleEditProfileClick, handleTrainersClick, handleCreateWorkoutClick, handleDeleteAccountClick}) {
    const mappedTrainers = trainers.map (trainer => <TrainerCard key={trainer.id} {...trainer}/>)

    return (
        <div>
            <AppBar position="static">
            <Toolbar sx={{ justifyContent: 'space-between' }}>
            <Box>
                <Typography variant="h4" component="div" sx={{ fontFamily: 'Arial', fontWeight: 'bold' }}>
                <Link to="/" class="perfect-fit-link">
                PerfectFit
                </Link>
                </Typography>
            </Box>
            <Box>
                <Button onClick={handleTrainersClick} color="inherit">
                See all trainers
                </Button>
                <Button onClick={handleCreateWorkoutClick} color="inherit">
                Create a workout
                </Button>
                <Button onClick={handleEditProfileClick} color="inherit">
                Edit Profile
                </Button>
                <Button onClick={handleDeleteAccountClick} color="inherit">
                Delete account
                </Button>
                <Button onClick={handleSignOutClick} color="inherit">
                Sign Out
                </Button>
            </Box>
            </Toolbar>
            </AppBar>
            <h2>PerfectFit's trainers</h2>
            <div class="container">
                {mappedTrainers}
            </div>
        </div>
  )
}

export default TrainerCollection