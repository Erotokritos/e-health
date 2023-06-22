import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";

function Registration() {
  const initialValues = {
    username: "",
    password: "",
    typeOfUser: [],
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().min(3).max(15).required("Username Required"),
    password: Yup.string().min(4).max(20).required("Password Required"),
    typeOfUser: Yup.string().required(
      "You have to declare if you are a patient or a doctor"
    ),
  });

  const onSubmit = (data) => {
    axios.post("http://localhost:3001/auth", data).then((response) => {
      if (!response.data.error) {
        alert("You have successfully Subed");
      } else {
        alert(response.data.error);
      }
    });
  };

  return (
    <div>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form className="formContainer">
          <label>Username</label>
          <ErrorMessage name="username" component="span" />
          <Field id="inputUser" name="username" placeholder="Username"></Field>
          <label>Password</label>
          <ErrorMessage name="password" component="span" />
          <Field
            id="inputUser"
            name="password"
            placeholder="Your Password"
            type="password"
          ></Field>
          <div id="my-radio-group">I am :</div>
          <div role="group" aria-labelledby="my-radio-group">
            <label>
              <Field name="typeOfUser" value="Patient" type="radio"></Field>
            </label>
            Patient
            <label>
              <Field name="typeOfUser" value="Doctor" type="radio"></Field>
              Doctor
            </label>
          </div>

          <button type="submit">Sign up</button>
        </Form>
      </Formik>
    </div>
  );
}

export default Registration;
