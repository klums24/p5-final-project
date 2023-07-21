import React from 'react'
import { AppBar, Toolbar, Button, Box, Typography } from '@mui/material';
import { useContext } from 'react';
import { ClientContext } from '../context/clientContext';
import { useHistory } from 'react-router-dom';

function NavBar({handleTrainersClick, handleCreateWorkoutClick, handleContactUsClick, handleExercisesClick}) {

    const {currentClient, handleDeleteAccountClick, handleSignOutClick} = useContext(ClientContext)
    const history = useHistory()
    const handleEditProfileClick = () => {
        history.push(`/clients/${currentClient.id}/edit-profile`);
    };
    const handleCreateRoutineClick = () => {
        history.push('/create-routine');
      };
    
    
    return (
        <div>
        <AppBar position="static">
            <Toolbar sx={{ justifyContent: 'space-between' }}>
            <Box>
                <Typography variant="h4" component="div" sx={{ fontFamily: 'Arial', fontWeight: 'bold' }}>
                PerfectFit
                </Typography>
            </Box>
            <Box>
                <Button onClick={handleTrainersClick} color="inherit">
                See all trainers
                </Button>
                <Button onClick={handleCreateWorkoutClick} color="inherit">
                Create an exercise
                </Button>
                <Button onClick={handleCreateRoutineClick} color="inherit">
                Create a routine
                </Button>
                <Button onClick={handleExercisesClick} color="inherit">
                See Your Exercises
                </Button>
                <Button onClick={handleEditProfileClick} color="inherit">
                Edit Profile
                </Button>
                <Button onClick={handleContactUsClick} color="inherit">
                Contact Us
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
        </div>
    )
}

export default NavBar