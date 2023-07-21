import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { TextField, Button, Typography, Snackbar, AppBar, Toolbar, Box } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import NavBar from './NavBar';
import { useHistory } from "react-router-dom";
function SignInForm({ saveClient, handleToggleForm }) {

  const history = useHistory()
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("error");
  
  const showSnackbar = (message, severity) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };
  
  const userSchema = yup.object({
    email: yup.string().required("Must enter an email"),
    password: yup.string().required("Please enter your password").min(4, "Password must contain at least 4 characters"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: userSchema,
    onSubmit: (values) => {
      fetch("/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values, null, 2),
      })
        .then((resp) => {
          if (resp.ok) {
            resp.json().then((client) => {
              saveClient(client);
              
            });
          } else {
            resp.json().then((error) => {
              showSnackbar(error.error, "error");
            });
          }
        })
        
    },
  });

 

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
      <div className="signin-form" style={{ maxWidth: 400, margin: '0 auto' }}>
        <Typography variant="h4" align = "center">
          Sign In
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <TextField
              id="email"
              name="email"
              type="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              placeholder="Email"
              margin = "normal"
            />
            <TextField
              id="password"
              name="password"
              type="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              placeholder="Password"
              margin = "normal"
            />
          </div>
          <Button  type="submit" variant="contained" color="primary" size="small" style={{ marginTop: 16,}}>
            Submit
          </Button>
        </form>
        <Button onClick={handleToggleForm} variant="text">
          Click here to sign up!
        </Button>

        <Snackbar open={snackbarOpen} autoHideDuration={3000} onClose={handleCloseSnackbar} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
          <MuiAlert onClose={handleCloseSnackbar} severity={snackbarSeverity} elevation={6} variant="filled">
            {snackbarMessage}
          </MuiAlert>
        </Snackbar>
      </div>
    </div>
  );
}

export default SignInForm;
