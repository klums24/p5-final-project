import React from 'react'
import {useFormik} from "formik";
import * as yup from "yup";
import { TextField, Button, Typography } from '@mui/material';

function SignInForm({saveClient, handleToggleForm}) {

    const userSchema = yup.object({
      email: yup.string().required("Must enter an email"),
      password: yup.string()
        .required("Please enter your password")
        .min(8, "Password must contain at least 8 characters"),
    });
      const formik = useFormik ({
          initialValues: {
              email: "",
              password: "",
          },
          validationSchema: userSchema,
          onSubmit: values => {
              fetch("/api/v1/signup", {
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
          <Typography variant="h4" component="h2">Sign In</Typography>
          <form onSubmit={formik.handleSubmit}>

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
            Click here to sign up!
          </Button>
        </div>
    );
}
      
      export default SignInForm;