import React, {useState} from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useHistory, useParams} from 'react-router-dom';
import { TextField, Button, Typography, Select, MenuItem, Snackbar, responsiveFontSizes } from '@mui/material';
import MuiAlert from '@mui/material/Alert';



function NewWorkoutForm({handleAddWorkout}) {

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('error');

  const workoutSchema = yup.object({
    workout_type: yup.string().required('Workout type is required'),
    date: yup.date().required('Date is required'),
    start_time: yup.string().required('Start time is required'),
    end_time: yup
    .string()
    .required('End time is required')
    .test('is-after-start', 'End time must be after start time', function (value) {
      const { start_time } = this.parent;
      return start_time && value ? value > start_time : true;
    }),
  })
  const { trainerId } = useParams();
  const history = useHistory();

  const formik = useFormik({
    initialValues: {
      workout_type: '',
      date: '',
      start_time: '',
      end_time: '',
      trainer_id: trainerId,
    },
    validationSchema: workoutSchema,
    onSubmit: (values) => {
      fetch('/workouts', { 
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values) })
      .then((resp) => {
        // debugger  
        if (resp.ok) {
          
          return resp.json()  
        }
        // else {
        //   resp.json().then((error) => {
        //     showSnackbar(error.error, "error")
        //   })
        // }
        
      })
      .then((data) => {
        handleAddWorkout(data)
        history.push('/workouts');
      })
      .catch((error) => {
        console.error('Error creating workout:', error);
      });
    },
  });

  const showSnackbar = (message, severity) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <div>
      <h2>New Workout</h2>
      <form onSubmit={formik.handleSubmit}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div>
            <label htmlFor="workout_type">Workout Type:</label>
            <TextField
              type="text"
              id="workout_type"
              name="workout_type"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.workout_type}
            />
            {formik.touched.workout_type && formik.errors.workout_type && (
              <div>{formik.errors.workout_type}</div>
            )}
          </div>
          <div>
            <label htmlFor="date">Date:</label>
            <TextField
              type="date"
              id="date"
              name="date"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.date}
            />
            {formik.touched.date && formik.errors.date && <div>{formik.errors.date}</div>}
          </div>
          <div>
            <label htmlFor="start_time">Start Time:</label>
            <TextField
              type="time"
              id="start_time"
              name="start_time"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.start_time}
            />
            {formik.touched.start_time && formik.errors.start_time && (
              <div>{formik.errors.start_time}</div>
            )}
          </div>
          <div>
            <label htmlFor="end_time">End Time:</label>
            <TextField
              type="time"
              id="end_time"
              name="end_time"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.end_time}
            />
            {formik.touched.end_time && formik.errors.end_time && <div>{formik.errors.end_time}</div>}
          </div>
        </div>
        <input type="hidden" id="trainer_id" name="trainer_id" value={formik.values.trainer_id} />
        <button type="submit">Submit</button>
        <Snackbar open={snackbarOpen} autoHideDuration={3000} onClose={handleCloseSnackbar} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <MuiAlert onClose={handleCloseSnackbar} severity={snackbarSeverity} elevation={6} variant="filled">
          {snackbarMessage}
        </MuiAlert>
      </Snackbar>
      </form>
    </div>
  );
}

export default NewWorkoutForm;
