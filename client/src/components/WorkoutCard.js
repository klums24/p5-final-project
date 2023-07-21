import React from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

function WorkoutCard({id, client_id, trainer_id, workout_type, date, start_time, end_time, trainers, workouts, setWorkouts, handleDeleteWorkout}) {
    
    const currentTrainer = trainers.find(trainer => trainer.id === trainer_id);

    
    const handleCancelClick = () => {
        fetch(`/workouts/${id}`, {
          method: 'DELETE',
        })
          .then(response => {
            console.log("console log for DELETE")
            console.log(response)
            if (response.ok) {
              handleDeleteWorkout(id)
              
              console.log("Workout deleted successfully");
            } else {
              
              console.error("Failed to delete workout");
            }
          })
          .catch(error => {
            console.error("An error occurred while deleting the workout:", error);
          });
    };
    return (
    // <div className="workout-card">
    //      <h3>Workout with {currentTrainer ? `${currentTrainer.first_name} ${currentTrainer.last_name}` : 'Unknown Trainer'}</h3>
    //      <p>Workout type: {workout_type}</p>
    //      <p>Date: {date}</p>
    //      <p>Start time: {start_time}</p>
    //      <p>End time: {end_time}</p>
    //      <p>Workout ID: {id}</p>
    //      <button onClick={handleCancelClick}>Cancel workout</button>
    // </div>
    <Card sx={{ maxWidth: 345, backgroundColor: '#81cff9', border: '3px solid #000000'  }}>
      <CardMedia
        sx={{ height: 140 }}
      />
      <CardContent>
        <Typography gutterBottom variant="h4" component="div">
          Workout with {currentTrainer.first_name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Workout type: {workout_type}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Date: {date}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Start time: {start_time}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          End time: {end_time}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Workout ID: {id}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={handleCancelClick}>Cancel workout </Button>
      </CardActions>
    </Card>
    )
}

export default WorkoutCard