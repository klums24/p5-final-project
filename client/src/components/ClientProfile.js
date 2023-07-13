import React from 'react';
import { useHistory } from 'react-router-dom';
import { AppBar, Toolbar, Button, Box, Typography } from '@mui/material';

function ClientProfile({handleSignOutClick, currentClient, saveClient}) {

  const history = useHistory();
  const {first_name, last_name, id} = currentClient

  const handleTrainersClick = () => {
    history.push('/trainers');
  };

  const handleCreateWorkoutClick = () => {
    history.push('/create-workout');
  };

  const handleDeleteAccountClick = () => {
    fetch(`/clients/${id}`, {
      method: "DELETE"
    })
    .then(response => {
      if (response.ok){
        saveClient(null)    
      }
    })
    .catch(e => console.error(e))
  };

  

  return (
    <div>
      <AppBar position="static">
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Box>
            <Typography variant="h6" component="div" sx={{ fontFamily: 'Arial', fontWeight: 'bold' }}>
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
  );
}

export default ClientProfile;
