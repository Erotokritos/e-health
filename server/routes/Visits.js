const express = require("express");
const router = express.Router();
const { Visits, Patients, Doctors, Medications } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddleware");

//POST ENDPOINTS
//Visit Entry
router.post("/", validateToken, async (req, res) => {
  if (!req.user.typeOfUser == "Doctor") {
    res.json({ error: "You are not authenticated to enter a visit" });
  } else {
    const visit = req.body;
    const doctor = await Doctors.findOne({
      where: { UserId: req.user.id },
    });
    const medNumber = req.body.medicalNumber;
    const patient = await Patients.findOne({
      where: { medicalNumber: medNumber },
    });

    visit.DoctorId = doctor.id;
    visit.PatientId = patient.id;
    await Visits.create(visit);
    res.json(visit);
  }
});

//Medication Entry
router.post("/medication", validateToken, async (req, res) => {
  if (!req.user.typeOfUser == "Doctor") {
    res.json({ error: "You are not authenticated to enter a visit" });
  } else {
    const medication = req.body;
    const doctor = await Doctors.findOne({
      where: { UserId: req.user.id },
    });
    const medNumber = req.body.medicalNumber;
    const patient = await Patients.findOne({
      where: { medicalNumber: medNumber },
    });

    medication.DoctorId = doctor.id;
    medication.PatientId = patient.id;
    await Medications.create(medication);
    res.json(medication);
  }
});

//GET ENDPOINTS
//Getting patient's list of Visits
router.get("/patient", validateToken, async (req, res) => {
  const patient = await Patients.findOne({ where: { UserId: req.user.id } });
  if (patient) {
    const listOfVisits = await Visits.findAll({
      where: { PatientId: patient.id },
    });
    if (listOfVisits) {
      res.json(listOfVisits);
    } else {
      res.json("No visits found");
    }
  } else {
    res.json("patient not found");
  }
});

//Getting patient's list of Medications
router.get("/patientmedication", validateToken, async (req, res) => {
  const patient = await Patients.findOne({ where: { UserId: req.user.id } });
  if (patient) {
    const listOfMedications = await Medications.findAll({
      where: { PatientId: patient.id },
    });
    if (listOfMedications) {
      res.json(listOfMedications);
    } else {
      res.json("No medication found");
    }
  } else {
    res.json("patient not found");
  }
});

//Getting Doctors's list of Visits
router.get("/doctor", validateToken, async (req, res) => {
  const doctor = await Doctors.findOne({ where: { UserId: req.user.id } });
  if (doctor) {
    const listOfVisits = await Visits.findAll({
      where: { DoctorId: doctor.id },
    });
    if (listOfVisits) {
      res.json(listOfVisits);
    } else {
      res.json("No visits found");
    }
  } else {
    res.json("doctor not found");
  }
});

//Getting doctor's list of Medications
router.get("/doctormedication", validateToken, async (req, res) => {
  const doctor = await Doctors.findOne({ where: { UserId: req.user.id } });
  if (doctor) {
    const listOfMedications = await Medications.findAll({
      where: { DoctorId: doctor.id },
    });
    if (listOfMedications) {
      res.json(listOfMedications);
    } else {
      res.json("No medication found");
    }
  } else {
    res.json("doctor not found");
  }
});

module.exports = router;
