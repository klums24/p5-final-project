import React from 'react'
import { Card, CardContent, Typography } from '@mui/material';
import "./style.css"

function TrainerCard({first_name, email, specialization, bio}) {
    return (
        <div className="trainer-card">
          <h3>{first_name}</h3>
          <p>Email: {email}</p>
          <p>Bio: {bio}</p>
          <p>Specialization: {specialization}</p>
        </div>
      );
    }
    // return (
    //     <Card>
    //       <CardContent>
    //         <Typography variant="h6" component="div">
    //           {first_name}
    //         </Typography>
    //         <Typography variant="body2" color="text.secondary">
    //           Email: {email}
    //         </Typography>
    //         <Typography variant="body2" color="text.secondary">
    //           Specialization: {specialization}
    //         </Typography>
    //         <Typography variant="body2" color="text.secondary">
    //           Bio: {bio}
    //         </Typography>
    //       </CardContent>
    //     </Card>
    //   );


export default TrainerCard