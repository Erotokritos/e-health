import React, { useContext, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../helpers/AuthContext";

function EditInfo() {
  let navigate = useNavigate();
  const { authState } = useContext(AuthContext);
  const initialValues = {
    name: "",
    surname: "",
    fatherName: "",
    age: "",
    medicalNumber: "",
    address: "",
    phoneNumber: "",
    profession: "",
    maritalStatus: "",
    bloodType: "",
    allergies: "",
    smoking: "",
    bodyWeight: "",
    bmi: "",
    stds: "",
    drinking: "",
    excercise: "",
    timeSpentOnScreen: "",
    healthStatus: "",
  };
  const validationSchema = Yup.object().shape({
    name: Yup.string().required(""),
    surname: Yup.string().required(""),
    fatherName: Yup.string().required(""),
    age: Yup.string().required(""),
    medicalNumber: Yup.string().required(""),
    address: Yup.string().required(""),
    phoneNumber: Yup.string().required(""),
    profession: Yup.string().required(""),
    bodyWeight: Yup.string().required(""),
    height: Yup.string().required(""),
    bmi: Yup.string().required(""),
    stds: Yup.string().required(""),
    allergies: Yup.string().required(""),
    maritalStatus: Yup.string().required(""),
    bloodType: Yup.string().required(""),
    smoking: Yup.string().required(""),
    drinking: Yup.string().required(""),
    excercise: Yup.string().required(""),
    timeSpentOnScreen: Yup.string().required(""),
    healthStatus: Yup.string().required(""),
  });

  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      navigate("/login");
    }
  }, []);

  const onSubmit = (data) => {
    axios
      .post("http://localhost:3001/auth/patientInfo", data, {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then((response) => {
        alert("Your Infos has been successfully added");
        navigate("/homepatient");
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
          <label>Name</label>
          <ErrorMessage name="name" component="span" />
          <Field
            id="inputCreatePost"
            name="name"
            placeholder="Erotokritos"
          ></Field>
          <label>Surname</label>
          <ErrorMessage name="surname" component="span" />
          <Field
            id="inputCreatePost"
            name="surname"
            placeholder="Sapounas"
          ></Field>
          <ErrorMessage name="father's name" component="span" />
          <label>Father's Name</label>
          <Field
            id="inputCreatePost"
            name="fatherName"
            placeholder="Achilleas"
          ></Field>
          <ErrorMessage name="age" component="span" />
          <label>Age</label>
          <Field id="inputCreatePost" name="age" placeholder="26"></Field>
          <ErrorMessage name="medicalNumber" component="span" />
          <label>Medical Number</label>
          <Field
            id="inputCreatePost"
            name="medicalNumber"
            placeholder="1234567890"
          ></Field>
          <ErrorMessage name="adress" component="span" />
          <label>Address</label>
          <Field
            id="inputCreatePost"
            name="address"
            placeholder="Rio 1"
          ></Field>
          <ErrorMessage name="phoneNumber" component="span" />
          <label>Phone Number</label>
          <Field
            id="inputCreatePost"
            name="phoneNumber"
            placeholder="+3069812345"
          ></Field>
          <ErrorMessage name="profession" component="span" />
          <label>Profession</label>
          <Field
            id="inputCreatePost"
            name="profession"
            placeholder="Electrical Engineer"
          ></Field>
          <ErrorMessage name="marital Status" component="span" />
          <label>Marital Status</label>
          <Field
            id="inputCreatePost"
            name="maritalStatus"
            placeholder="Married"
          ></Field>
          <ErrorMessage name="blood type" component="span" />
          <label>Blood Type</label>
          <Field id="inputCreatePost" name="bloodType" placeholder="O+"></Field>
          <ErrorMessage name="bodyWeight" component="span" />
          <label>Boddy Weight (kg)</label>
          <Field
            id="inputCreatePost"
            name="bodyWeight"
            placeholder="75"
          ></Field>
          <ErrorMessage name="height" component="span" />
          <label>Height (cm)</label>
          <Field id="inputCreatePost" name="height" placeholder="178"></Field>
          <ErrorMessage name="bmi" component="span" />
          <label>Body Mass Index</label>
          <Field id="inputCreatePost" name="bmi" placeholder="20"></Field>
          <ErrorMessage name="stds" component="span" />
          <label>STDS</label>
          <Field id="inputCreatePost" name="stds" placeholder="HIV"></Field>
          <ErrorMessage name="allergies" component="span" />
          <label>Allergies</label>
          <Field
            id="inputCreatePost"
            name="allergies"
            placeholder="Nuts"
          ></Field>
          <ErrorMessage name="Smoking" component="span" />
          <label>Smoking (Packet's per day)</label>
          <Field id="inputCreatePost" name="smoking" placeholder="1"></Field>
          <ErrorMessage name="drinking" component="span" />
          <label>Drinking (Glasses per day)</label>
          <Field id="inputCreatePost" name="drinking" placeholder="1"></Field>
          <ErrorMessage name="excercise" component="span" />
          <label>Excercise (days per week)</label>
          <Field id="inputCreatePost" name="excercise" placeholder="1"></Field>
          <ErrorMessage name="Time Spent On Screen" component="span" />
          <label>Hours you stay in front of a Screen (per day)</label>
          <Field
            id="inputCreatePost"
            name="timeSpentOnScreen"
            placeholder="1"
          ></Field>
          <ErrorMessage name="Current Health Status" component="span" />
          <label>Your current health status</label>
          <Field
            id="inputCreatePost"
            name="healthStatus"
            placeholder="Healthy,Unhealthy,Chronic Disease"
          ></Field>
          <button type="submit">Apply</button>
        </Form>
      </Formik>
    </div>
  );
}

export default EditInfo;
