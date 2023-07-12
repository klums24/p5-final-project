import React from 'react';
import { useHistory } from 'react-router-dom';
import { AppBar, Toolbar, Button, Box } from '@mui/material';

function ClientProfile({handleSignOutClick}) {
  const history = useHistory();

  const handleTrainersClick = () => {
    history.push('/trainers');
  };

  const handleCreateWorkoutClick = () => {
    history.push('/create-workout');
  };

  const handleDeleteAccountClick = () => {
    // Logic to delete the account
  };

  

  return (
    <div>
      <AppBar position="static">
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Box>
            <Button onClick={handleTrainersClick} color="inherit">
              See all trainers
            </Button>
            <Button onClick={handleCreateWorkoutClick} color="inherit">
              Create a workout
            </Button>
          </Box>
          <Box>
            <Button onClick={handleDeleteAccountClick} color="inherit">
              Delete account
            </Button>
            <Button onClick={handleSignOutClick} color="inherit">
              Sign Out
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Rest of the component content */}
    </div>
  );
}

export default ClientProfile;
