import React, { useContext, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../helpers/AuthContext";

function DoctorEditInfo() {
  let navigate = useNavigate();
  const { authState } = useContext(AuthContext);
  const initialValues = {
    specialty: "",
    name: "",
    surname: "",
    fatherName: "",
    age: "",
    doctorNumber: "",
    address: "",
    phoneNumber: "",
    bio: "",
  };

  const validationSchema = Yup.object().shape({
    specialty: Yup.string().required(""),
    name: Yup.string().required(""),
    surname: Yup.string().required(""),
    fatherName: Yup.string().required(""),
    age: Yup.string().required(""),
    doctorNumber: Yup.string().required(""),
    address: Yup.string().required(""),
    phoneNumber: Yup.string().required(""),
    bio: Yup.string().required(""),
  });

  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      navigate("/login");
    }
  }, []);

  const onSubmit = (data) => {
    axios
      .post("http://localhost:3001/auth/doctorinfo", data, {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then((response) => {
        alert("Your Infos has been successfully added");
        navigate("/");
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
          <label>Specialty</label>
          <ErrorMessage name="specialty" component="span" />
          <Field
            id="inputCreatePost"
            name="specialty"
            placeholder="Cardiologist"
          ></Field>
          <label>Name</label>
          <ErrorMessage name="name" component="span" />
          <Field id="inputCreatePost" name="name" placeholder="Doc"></Field>
          <label>Surname</label>
          <ErrorMessage name="surname" component="span" />
          <Field id="inputCreatePost" name="surname" placeholder="Oc"></Field>
          <label>Father's Name</label>
          <ErrorMessage name="fatherName" component="span" />
          <Field
            id="inputCreatePost"
            name="fatherName"
            placeholder="John"
          ></Field>
          <label>Age</label>
          <ErrorMessage name="age" component="span" />
          <Field id="inputCreatePost" name="age" placeholder="35"></Field>
          <label>Licsence Number</label>
          <ErrorMessage name="doctorNumber" component="span" />
          <Field
            id="inputCreatePost"
            name="doctorNumber"
            placeholder="987654321"
          ></Field>
          <label>Address</label>
          <ErrorMessage name="address" component="span" />
          <Field
            id="inputCreatePost"
            name="address"
            placeholder="Rio 3"
          ></Field>
          <label>Phone Number</label>
          <ErrorMessage name="phoneNumber" component="span" />
          <Field
            id="inputCreatePost"
            name="phoneNumber"
            placeholder="2610000000"
          ></Field>
          <label>Bio</label>
          <ErrorMessage name="bio" component="span" />
          <Field
            id="inputCreatePost"
            name="bio"
            placeholder="Tell us about yourself.."
          ></Field>
          <button type="submit">Apply</button>
        </Form>
      </Formik>
    </div>
  );
}

export default DoctorEditInfo;
