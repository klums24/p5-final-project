import React from 'react'

function ExerciseCard({id, name, reps, duration, difficulty}) {
  return (
    <div className="workout-card">
        <p>name: {name}</p>
        <p>reps: {reps}</p>
        <p>duration: {duration}</p>
        <p>difficulty: {difficulty}</p>

    </div>
  )
}

export default ExerciseCard