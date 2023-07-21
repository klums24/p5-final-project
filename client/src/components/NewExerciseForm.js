import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Button, TextField, Typography } from '@mui/material';
import { useHistory } from 'react-router-dom';

function NewExerciseForm() {
  const history = useHistory();

  const exerciseSchema = yup.object({
    name: yup.string().required('Exercise name is required'),
    reps: yup.number().required('Reps is required').min(1, "Reps must be at least 1"),
    duration: yup.number().required('Duration is required').min(1, "Minutes must be at least 1"),
    difficulty: yup.string().required('Difficulty is required'),
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      reps: 0,
      duration: 0,
      difficulty: '',
    },
    validationSchema: exerciseSchema,
    onSubmit: (values) => {
      fetch('/exercises', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      })
        .then((response) => {
          if (response.ok) {
            console.log('Exercise added successfully');
            // Perform any additional actions upon successful submission
            history.push('/');
          } else {
            console.error('Failed to add exercise');
          }
        })
        .catch((error) => {
          console.error('An error occurred while adding the exercise:', error);
        });
    },
  });

  return (
    <div className="exercise-form">
      <Typography variant="h4" component="h2">Exercise Form</Typography>
      <form onSubmit={formik.handleSubmit}>
        <div className="form-group">
          <TextField
            id="name"
            name="name"
            label="Exercise Name"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
          />
        </div>
        <div className="form-group">
          <TextField
            id="reps"
            name="reps"
            label="Reps"
            type="number"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.reps}
            error={formik.touched.reps && Boolean(formik.errors.reps)}
            helperText={formik.touched.reps && formik.errors.reps}
          />
        </div>
        <div className="form-group">
          <TextField
            id="duration"
            name="duration"
            label="Duration (in minutes)"
            type="number"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.duration}
            error={formik.touched.duration && Boolean(formik.errors.duration)}
            helperText={formik.touched.duration && formik.errors.duration}
          />
        </div>
        <div className="form-group">
          <TextField
            id="difficulty"
            name="difficulty"
            label="Difficulty"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.difficulty}
            error={formik.touched.difficulty && Boolean(formik.errors.difficulty)}
            helperText={formik.touched.difficulty && formik.errors.difficulty}
          />
        </div>
        <Button type="submit" variant="contained" color="primary">Submit</Button>
      </form>
    </div>
  );
}

export default NewExerciseForm;
