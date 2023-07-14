import React from 'react';
import { AppBar, Toolbar, Button, Box, Typography } from '@mui/material';

function ClientProfile({handleSignOutClick, currentClient, saveClient, handleEditProfileClick, handleTrainersClick, handleCreateWorkoutClick, handleDeleteAccountClick, handleContactUsClick}) {


  const {first_name, last_name, id} = currentClient

  

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
              Create a workout
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
      <h2 className="profile-header">{first_name}</h2>
    </div>
  );
}

export default ClientProfile;
