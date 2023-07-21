import React from "react"
import { AppBar, Toolbar, Button, Box, Typography } from "@mui/material";
import TrainerCard from "./TrainerCard";
import "./style.css"
import { Link } from "react-router-dom";

function TrainerCollection({trainers}) {
    const mappedTrainers = trainers.map (trainer => <TrainerCard key={trainer.id} {...trainer}/>)

    return (
        <div>
            <h1 align= "center">Meet our trainers</h1>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around' }}>
                {mappedTrainers}
            </div>
        </div>
  )
}

export default TrainerCollection