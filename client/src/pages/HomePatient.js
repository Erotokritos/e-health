import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
function HomePatient() {
  let navigate = useNavigate();
  const [listOfVisits, setListOfVisits] = useState([]);
  const [listOfMedications, setListOfMedications] = useState([]);
  //Date Constructor
  let date = new Date();
  let day = date.getDate();
  let month = date.getMonth();
  let year = date.getFullYear();
  const today = year + "-" + (month + 1) + "-" + day;
  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      navigate("/login");
    } else {
      axios
        .get("http://localhost:3001/visits/patient", {
          headers: { accessToken: localStorage.getItem("accessToken") },
        })
        .then((response) => {
          if (
            response.data === "No visits found" ||
            response.data === "patient not found"
          ) {
            setListOfVisits([]);
          } else {
            setListOfVisits(response.data);
          }
        });
      axios
        .get("http://localhost:3001/visits/patientmedication", {
          headers: { accessToken: localStorage.getItem("accessToken") },
        })
        .then((response) => {
          if (
            response.data === "No medications found" ||
            response.data === "patient not found"
          ) {
            setListOfVisits([]);
          } else {
            setListOfMedications(response.data);
          }
        });
    }
  }, []);

  return (
    <div>
      <h1>Today is: {today}</h1>
      <div>
        <div className="postPage">
          <div className="leftSide">
            <h1>Medication</h1>
            {listOfMedications.map((value, key) => {
              return (
                <div key={key} className="post">
                  <div className="title">{value.nameOfMedication}</div>
                  <div className="body">
                    <label>Dosage: </label>
                    <h3>{value.dosage}</h3>
                    <label>Until : </label>
                    <h3>{value.endDate.substring(0, 10)}</h3>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="rightSide">
            <h1>Latest Visits</h1>
            <div className="listOfComments">
              {listOfVisits.map((value, key) => {
                return (
                  <div key={key} className="post">
                    <div className="title">{value.reasonOfVisit}</div>
                    <div className="body">
                      <label>Date of Visit</label>
                      <h3>{value.date.substring(0, 10)}</h3>
                      <label>Doctor's Conclusion</label>
                      <h3>{value.conclusion}</h3>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePatient;
