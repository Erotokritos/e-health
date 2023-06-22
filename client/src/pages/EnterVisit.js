import React, { useContext, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../helpers/AuthContext";

function EnterVisit() {
  let navigate = useNavigate();
  const { authState } = useContext(AuthContext);
  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      navigate("/login");
    }
  }, []);

  const initialValues = {
    date: "",
    reasonOfVisit: "",
    conclusion: "",
    notes: "",
    medicalNumber: "",
  };

  const validationSchema = Yup.object().shape({
    date: Yup.date().required("A date is required"),
    reasonOfVisit: Yup.string().required(
      "Reason of patient's visit is required"
    ),
    conclusion: Yup.string().required("Conclusion of doctor's is required"),
    notes: Yup.string(),
    medicalNumber: Yup.string().required(
      "Patient's medical number is required"
    ),
  });

  const onSubmit = (data) => {
    axios
      .post("http://localhost:3001/visits/", data, {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then((response) => {
        alert("Visit Submited");
      });
  };

  const initialValuesMed = {
    medicalNumber: "",
    reasonOfMedication: "",
    startDate: "",
    endDate: "",
    nameOfMedication: "",
    dosage: "",
    prescription: "",
    notes: "",
  };

  const validationSchemaMed = Yup.object().shape({
    reasonOfMedication: Yup.string().required(
      "Reason of Medication is required"
    ),
    startDate: Yup.date().required("A starting date is required"),
    endDate: Yup.date().required("An ending date is required"),
    nameOfMedication: Yup.string().required(
      "The name of medication is required"
    ),
    dosage: Yup.string().required("Dosage is required"),
    prescription: Yup.string().required("A prescription is required"),
    notes: Yup.string(),
    medicalNumber: Yup.string().required(
      "Patient's medical number is required"
    ),
  });

  const onSubmitMed = (data) => {
    axios
      .post("http://localhost:3001/visits/medication", data, {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then((response) => {
        alert("Medication Submited");
      });
  };

  return (
    <div className="createPostPage">
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form className="formContainer" style={{ marginTop: "10px" }}>
          <h3>Enter a Patient's Visit</h3>
          <label>Medical Number</label>
          <ErrorMessage name="medicalNumber" component="span" />
          <Field
            id="inputCreatePost"
            name="medicalNumber"
            placeholder="Patient's Medical Number"
          ></Field>
          <label>Date</label>
          <ErrorMessage name="date" component="span" />
          <Field
            id="inputCreatePost"
            name="date"
            type="date"
            placeholder=""
          ></Field>
          <label>Reason of Visit</label>
          <ErrorMessage name="reasonOfVisit" component="span" />
          <Field
            id="inputCreatePost"
            name="reasonOfVisit"
            placeholder="Ex. Chest Pain"
          ></Field>
          <label>Doctor's Conclusion</label>
          <ErrorMessage name="conclusion" component="span" />
          <Field
            id="inputCreatePost"
            name="conclusion"
            placeholder="Ex. Stress"
          ></Field>
          <label>Notes</label>
          <ErrorMessage name="notes" component="span" />
          <Field
            id="inputCreatePost"
            name="notes"
            placeholder="Not required"
          ></Field>

          <button type="submit">Submit Visit</button>
        </Form>
      </Formik>

      {/* Medication Form */}

      <Formik
        initialValues={initialValuesMed}
        onSubmit={onSubmitMed}
        validationSchema={validationSchemaMed}
      >
        <Form className="formContainer" style={{ marginTop: "15px" }}>
          <h3>Enter medication for your patient</h3>
          <label>Medical Number</label>
          <ErrorMessage name="medicalNumber" component="span" />
          <Field
            id="inputCreatePost"
            name="medicalNumber"
            placeholder="Patient's Medical Number"
          ></Field>
          <label>Reason Of Medication</label>
          <ErrorMessage name="reasonOfMedication" component="span" />
          <Field
            id="inputCreatePost"
            name="reasonOfMedication"
            placeholder="Stress"
          ></Field>
          <label>Start Date</label>
          <ErrorMessage name="startDate" component="span" />
          <Field
            id="inputCreatePost"
            name="startDate"
            type="date"
            placeholder=""
          ></Field>
          <label>End Date</label>
          <ErrorMessage name="endDate" component="span" />
          <Field
            id="inputCreatePost"
            name="endDate"
            placeholder=""
            type="date"
          ></Field>
          <label>Name of Medication</label>
          <ErrorMessage name="nameOfMedication" component="span" />
          <Field
            id="inputCreatePost"
            name="nameOfMedication"
            placeholder="Ex. Mesulid"
          ></Field>
          <label>Prescription</label>
          <ErrorMessage name="prescription" component="span" />
          <Field
            id="inputCreatePost"
            name="prescription"
            placeholder="Something"
          ></Field>
          <label>Dosage</label>
          <ErrorMessage name="dosage" component="span" />
          <Field
            id="inputCreatePost"
            name="dosage"
            placeholder="2 pills every second day"
          ></Field>
          <label>Notes</label>
          <ErrorMessage name="notes" component="span" />
          <Field
            id="inputCreatePost"
            name="notes"
            placeholder="Not required"
          ></Field>
          <button type="submit">Submit Medication</button>
        </Form>
      </Formik>
    </div>
  );
}

export default EnterVisit;
