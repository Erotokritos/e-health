const express = require("express");
const router = express.Router();
const { Users, Patients, Doctors } = require("../models");
const bcrypt = require("bcrypt");
const { validateToken } = require("../middlewares/AuthMiddleware");
const { sign } = require("jsonwebtoken");
const { Visits, Medications } = require("../models");

// POST ENDPOINTS
//Registration endpoint
router.post("/", async (req, res) => {
  const { username, password, typeOfUser } = req.body;
  bcrypt.hash(password, 10).then((hash) => {
    Users.create({
      username: username,
      password: hash,
      typeOfUser: typeOfUser,
    });
    res.json("SUCCESS");
  });
});

// Doctor's info registration
router.post("/doctorInfo", validateToken, async (req, res) => {
  const info = req.body;
  info.UserId = req.user.id;
  await Doctors.create(info);
  res.json(info);
});

// Patient's info registration
router.post("/patientInfo", validateToken, async (req, res) => {
  const infos = req.body;
  infos.UserId = req.user.id;
  await Patients.create(infos);
  res.json(infos);
});

//Login endpoint
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await Users.findOne({ where: { username: username } });
  if (!user) res.json({ error: "User Doesn't Exist" });
  else {
    bcrypt.compare(password, user.password).then((match) => {
      if (!match)
        res.json({ error: "Wrong Username And Password Combination" });
      else {
        const accessToken = sign(
          { username: user.username, id: user.id, typeOfUser: user.typeOfUser },
          "importantsecret"
        );
        res.json({
          token: accessToken,
          username: username,
          id: user.id,
          typeOfUser: user.typeOfUser,
        });
      }
    });
  }
});

// GET ENDPOINTS
//Getting patient's profile by medical number
router.get("/findPatient/:medicalNumber", validateToken, async (req, res) => {
  const medicalNumber = req.params.medicalNumber;
  const patient = await Patients.findOne({
    where: { medicalNumber: medicalNumber },
  });
  if (patient) {
    listOfVisits = await Visits.findAll({
      where: { PatientId: patient.id },
    });
    listOfMedications = await Medications.findAll({
      where: { PatientId: patient.id },
    });
    let userId = patient.UserId;
    const response = { userId, listOfVisits, listOfMedications };
    res.json(response);
  } else {
    res.json("Patient not found");
  }
});

//Doctor's Info by UsersId
router.get("/doctorInfo/:id", validateToken, async (req, res) => {
  const id = req.params.id;
  const listOfInfo = await Doctors.findAll({
    where: { UserId: id },
  });
  res.json(listOfInfo);
});

//Patient's Info by UsersId
router.get("/patientInfo/:id", validateToken, async (req, res) => {
  const id = req.params.id;
  const listOfInfo = await Patients.findAll({
    where: { UserId: id },
  });
  res.json(listOfInfo);
});

/*
router.get("/role", validateToken, async (req, res) => {
  const id = req.user.id;
  const role = await Users.findAll({
    where: { id: id },
    attributes: ["typeOfUser"],
  });
  res.json(role);
}); */

// Endpoint for access on Authentication Token
router.get("/token", validateToken, (req, res) => {
  res.json(req.user);
});

// Getting User's Info by Id
router.get("/info/:id", async (req, res) => {
  const id = req.params.id;

  const info = await Users.findByPk(id, {
    attributes: { exclude: ["password"] },
  });
  res.json(info);
});

// Getting list of all doctors
router.get("/doctors", validateToken, async (req, res) => {
  const listOfDoctors = await Doctors.findAll();
  res.json(listOfDoctors);
});

//PUT ENDPOINTS

//Updating the password field
router.put("/changepassword", validateToken, async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  const user = await Users.findOne({ where: { username: req.user.username } });
  if (!user) res.json({ error: "User Doesn't Exist" });
  else {
    bcrypt.compare(oldPassword, user.password).then((match) => {
      if (!match)
        res.json({ error: "Wrong Username And Password Combination" });
      else {
        bcrypt.hash(newPassword, 10).then(async (hash) => {
          await Users.update(
            { password: hash },
            { where: { username: req.user.username } }
          );
          res.json("SUCCESS");
        });
      }
    });
  }
});

module.exports = router;
