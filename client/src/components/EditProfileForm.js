import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { TextField, AppBar, Toolbar, Button, Box, Typography, Snackbar, Alert } from '@mui/material';
import { useHistory } from 'react-router-dom';
import { useContext } from 'react';
import { ClientContext } from '../context/clientContext';

function EditProfileForm({ handleSignOutClick, handleEditProfileClick, handleTrainersClick, handleCreateWorkoutClick, handleDeleteAccountClick }) {
  const history = useHistory();
  const { currentClient, saveClient } = useContext(ClientContext);
  const handleBackToProfileClick = () => {
    history.push("/workouts");
  };

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

  const formik = useFormik({
    initialValues: {
      first_name: currentClient.first_name,
      email: currentClient.email,
      main_goal: currentClient.main_goal,
    },
    validationSchema: yup.object({
      first_name: yup.string().required("Please enter your first name"),
      email: yup.string().required("Please enter an email"),
      main_goal: yup.string().required("Please enter your main workout goal"),
    }),
    onSubmit: (values) => {
      fetch(`/api/v1/clients/${currentClient.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values, null, 2),
      }).then((response) => {
        if (response.ok) {
          response.json()
            .then((client) => {
            saveClient(client);
            showSnackbar("Profile updated successfully!", "success");
          });
        } else {
          response.json().then((error) => {
            showSnackbar(error.error, "error");
          });
        }
      });
    },
  });

  return (
    <>
      
      <form onSubmit={formik.handleSubmit}>
        <div className="form-group">
          <label htmlFor="first_name">First Name:</label>
          <TextField
            id="first_name"
            name="first_name"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.first_name}
            placeholder="First Name"
          />
          {formik.touched.first_name && formik.errors.first_name && (
            <div className="error">{formik.errors.first_name}</div>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <TextField
            id="email"
            name="email"
            type="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            placeholder="Email"
          />
          {formik.touched.email && formik.errors.email && (
            <div className="error">{formik.errors.email}</div>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="main_goal">Main goal for workout:</label>
          <select
            id="main_goal"
            name="main_goal"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.main_goal}

          >
            <option value="" label="Select an option">
              Select an option
            </option>
            <option value="Weight loss" label="Weight Loss">
              Weight Loss
            </option>
            <option value="Increase strength" label="Increase Strength">
              Increase Strength
            </option>
            <option value="Improve cardio" label="Improve cardio">
              Improve cardio
            </option>
          </select>
          {formik.touched.main_goal && formik.errors.main_goal && (
            <div className="error">{formik.errors.main_goal}</div>
          )}
        </div>

        <Button class="button" type="submit" variant="contained" color="primary" size="small">Update</Button>

      </form>
      <Button onClick={handleBackToProfileClick} variant="text">
        Back to Profile
      </Button>

      <Snackbar open={snackbarOpen} autoHideDuration={3000} onClose={handleCloseSnackbar} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} elevation={6} variant="filled">
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
}

export default EditProfileForm;
