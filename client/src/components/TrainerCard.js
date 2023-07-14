import React from 'react'
import "./style.css"
import { useHistory } from 'react-router-dom';

function TrainerCard({id, first_name, last_name,  email, specialization, bio}) {
    const history = useHistory()
    const handleBookWorkoutClick = () => {
        history.push(`/create-workout/${id}`);
      };


    return (
        <div className="trainer-card">
          <h3>{first_name} {last_name}</h3>
          <p>Email: {email}</p>
          <p>Bio: {bio}</p>
          <p>Specialization: {specialization}</p>
          <button onClick={handleBookWorkoutClick} class="book-workout-button">Book a workout with {first_name} !</button>
        </div>
      );
    }
export default TrainerCard