import React from 'react'
import {useFormik} from "formik";
import * as yup from "yup";
import { TextField,  AppBar, Toolbar, Button, Box, Typography } from '@mui/material';
import {useHistory} from 'react-router-dom'
import { useContext } from 'react';
import { ClientContext } from '../context/clientContext';

function EditProfileForm({saveClient, handleSignOutClick, handleEditProfileClick, handleTrainersClick, handleCreateWorkoutClick, handleDeleteAccountClick}) {
    const history = useHistory()
    const {currentClient} = useContext(ClientContext)
    const handleBackToProfileClick = () => {
        history.push("/")
    }



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
        onSubmit: values => {
          fetch(`/clients/${currentClient.id}`, {
            method:"PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(values, null, 2),
          }).then(response => {
            if (response.ok) {
              response.json()
              .then(client => {
                saveClient(client) 
              })
            }
            else {
              response.json()
              .then(error => {
                alert(error.error)
              })
            }
          })
        },
    });
    return (
      <>
        
        <form onSubmit={formik.handleSubmit}>
            <div className="form-group">
              <label htmlFor="first_name">First Name:</label>
              <input
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
              <input
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
      </>
      )
}

export default EditProfileForm