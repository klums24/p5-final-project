import React from 'react'
import "./style.css"
import { useHistory } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

function TrainerCard({id, first_name, last_name,  email, specialization, bio, photo}) {
    const history = useHistory()
    const handleBookWorkoutClick = () => {
        history.push(`/create-workout/${id}`);
      };


    return (
        
      <Card sx={{ maxWidth: 345, backgroundColor: '#f9b981', border: '3px solid #000000'  }}>
        <CardMedia
          sx={{ height: 180}}
          image = {photo}
        />
        <CardContent>
          <Typography gutterBottom variant="h3" component="div">
            {first_name} {last_name}
          </Typography>
          <Typography variant="h5" color="text.secondary">
            "{bio}"
          </Typography>
          <Typography variant="h6" color="text.secondary">
            Specializes in: {specialization}
          </Typography>
          <Typography variant="h6" color="text.secondary">
            Email: {email}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" onClick={handleBookWorkoutClick}>Schedule a workout with {first_name} </Button>
        </CardActions>
      </Card>
      );
    }
export default TrainerCard