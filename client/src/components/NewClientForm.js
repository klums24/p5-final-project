import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { TextField, Button, Typography, Snackbar, AppBar, Toolbar, Box, MenuItem } from '@mui/material';
import MuiAlert from '@mui/material/Alert';

function NewClientForm({ saveClient, handleToggleForm }) {
  
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('error');

  const userSchema = yup.object({
    first_name: yup.string().required('Must enter a first name').min(4, 'First name must be at least 4 characters long'),
    last_name: yup.string().required('Must enter a last name'),
    email: yup.string().required('Must enter an email').email('Invalid email format'),
    password: yup.string().required('Please enter your password').min(8, 'Password must contain at least 8 characters'),
    main_goal: yup.string().required('Must select a main goal'),
  });

  const formik = useFormik({
    initialValues: {
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      main_goal: '',
    },
    validationSchema: userSchema,
    onSubmit: values => {
      console.log('Form submitted:', values);
      fetch('/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values, null, 2),
      })
        .then(resp => {
          console.log('RESP', resp);
          if (resp.ok) {
            resp.json().then(client => {
              saveClient(client);
            });
          } else {
            resp.json().then(error => {
              showSnackbar(error.error, 'error');
            });
          }
        })
        .catch(error => {
          console.error('Error:', error);
          showSnackbar('An error occurred during form submission.', 'error');
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
      <AppBar position="static">
        <Toolbar sx={{ justifyContent: "space-between"}}>
          <Box sx={{ width: "100%", textAlign: "center" }}>
            <Typography variant="h4" component="div" sx={{ fontFamily: 'Arial', fontWeight: 'bold', align: 'center'}}>
                  PerfectFit
            </Typography>    
          </Box>
        </Toolbar>
      </AppBar>
      <div className="signup-form" style={{ maxWidth: 400, margin: '0 auto' }}>
        <Typography variant="h4" component="h2" align = "center">
          Join PerfectFit Today!
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <TextField
              id="first_name"
              name="first_name"
              label="First Name"
              variant="outlined"
              value={formik.values.first_name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.first_name && !!formik.errors.first_name}
              helperText={formik.touched.first_name && formik.errors.first_name}
              margin="normal"
            />

            <TextField
              id="last_name"
              name="last_name"
              label="Last Name"
              variant="outlined"
              value={formik.values.last_name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.last_name && !!formik.errors.last_name}
              helperText={formik.touched.last_name && formik.errors.last_name}
              
              margin="normal"
            />

            <TextField
              id="email"
              name="email"
              label="Email"
              type="email"
              variant="outlined"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && !!formik.errors.email}
              helperText={formik.touched.email && formik.errors.email}
              
              margin="normal"
            />

            <TextField
              id="password"
              name="password"
              label="Password"
              type="password"
              variant="outlined"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.password && !!formik.errors.password}
              helperText={formik.touched.password && formik.errors.password}
              
              margin="normal"
            />

            <TextField
              id="main_goal"
              name="main_goal"
              label="Main Goal for Workout"
              variant="outlined"
              select
              value={formik.values.main_goal}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.main_goal && !!formik.errors.main_goal}
              helperText={formik.touched.main_goal && formik.errors.main_goal}
              margin="normal"
            >
          
            <MenuItem value="" label="Select an option">
              Select an option
            </MenuItem>
            <MenuItem value="Weight loss" label="Weight Loss">
              Weight Loss
            </MenuItem>
            <MenuItem value="Increase strength" label="Increase Strength">
              Increase Strength
            </MenuItem>
            <MenuItem value="Improve cardio" label="Improve cardio">
              Improve cardio
            </MenuItem>
          </TextField>
          </div>
          <Button type="submit" variant="contained" color="primary" size="small">
            Submit
          </Button>
        </form>
        <Button onClick={handleToggleForm} variant="text">
          Existing user? Click here to login
        </Button>

        <Snackbar
          open={snackbarOpen}
          autoHideDuration={3000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <MuiAlert onClose={handleCloseSnackbar} severity={snackbarSeverity} elevation={6} variant="filled">
            {snackbarMessage}
          </MuiAlert>
        </Snackbar>
      </div>
    </div>
  );
}

export default NewClientForm;
