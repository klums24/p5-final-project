import React from 'react'


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
    <div className="workout-card">
         <h3>Workout with {currentTrainer ? `${currentTrainer.first_name} ${currentTrainer.last_name}` : 'Unknown Trainer'}</h3>
         <p>Workout type: {workout_type}</p>
         <p>Date: {date}</p>
         <p>Start time: {start_time}</p>
         <p>End time: {end_time}</p>
         <p>Workout ID: {id}</p>
         <button onClick={handleCancelClick}>Cancel</button>
    </div>
  )
}

export default WorkoutCard