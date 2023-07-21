import React from 'react'
import "./style.css"
import { useHistory } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

function TrainerCard({id, first_name, last_name,  email, specialization, bio}) {
    const history = useHistory()
    const handleBookWorkoutClick = () => {
        history.push(`/create-workout/${id}`);
      };


    return (
        // <div className="trainer-card">
        //   <h3>{first_name} {last_name}</h3>
        //   <p>Email: {email}</p>
        //   <p>Bio: {bio}</p>
        //   <p>Specialization: {specialization}</p>
        //   <button onClick={handleBookWorkoutClick} class="book-workout-button">Book a workout with {first_name} !</button>
        // </div>
        <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        sx={{ height: 140 }}
        image="/static/images/cards/contemplative-reptile.jpg"
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h3" component="div">
          {first_name} {last_name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {bio}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={handleBookWorkoutClick}>Schedule a workout with {first_name} </Button>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
      );
    }
export default TrainerCard