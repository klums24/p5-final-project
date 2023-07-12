import React from 'react'
import {useFormik} from "formik";
import * as yup from "yup";
import { TextField, Button, Typography } from '@mui/material';

function NewClientForm({saveClient, handleToggleForm}) {

    const userSchema = yup.object({
      first_name: yup.string().required("Must enter a first name"),
      last_name: yup.string().required("Must enter a last name"),
      email: yup.string().required("Must enter an email"),
      password: yup.string()
        .required("Please enter your password")
        .min(8, "Password must contain at least 8 characters"),
    });
      const formik = useFormik ({
          initialValues: {
              first_name: "",
              last_name: "",
              email: "",
              password: "",
          },
          validationSchema: userSchema,
          onSubmit: values => {
              console.log('Form submitted:', values)
              fetch("/signup", {
                  method:"POST",
                  headers: {
                      "Content-Type": "application/json",   
                  },
                  body: JSON.stringify(values, null, 2),
              }).then(resp => {
                  console.log("RESP", resp)
                  if (resp.ok) {
                      resp.json()
                      .then(client => {
                          saveClient(client)
                      })
                  }
                  else {
                      resp.json()
                      .then(error=> {
                          alert(error.error)
                      })
                  }
              })
          },
      });
  
     
  
    return (
        <div className="signup-form">
          <Typography variant="h4" component="h2">Sign Up</Typography>
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
              <label htmlFor="last_name">Last Name:</label>
              <input
                id="last_name"
                name="last_name"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.last_name}
                placeholder="Last Name"
              />
              {formik.touched.last_name && formik.errors.last_name && (
                <div className="error">{formik.errors.last_name}</div>
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
              <label htmlFor="password">Password:</label>
              <input
                id="password"
                name="password"
                type="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                placeholder="Password"
              />
              {formik.touched.password && formik.errors.password && (
                <div className="error">{formik.errors.password}</div>
              )}
            </div>
    
            <Button type="submit" variant="contained" color="primary" size="small">Submit</Button>
          </form>
          <Button onClick={handleToggleForm} variant="text">
            Existing user? Click here to login
          </Button>
        </div>
    );
}
      
      export default NewClientForm;