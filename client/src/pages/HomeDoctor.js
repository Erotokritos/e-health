import React from "react";
import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import { AuthContext } from "../helpers/AuthContext";

function HomeDoctor() {
  const { authState } = useContext(AuthContext);
  let navigate = useNavigate();
  let role = authState.typeOfUser;
  const [listOfVisits, setListOfVisits] = useState([]);
  const [listOfMedications, setListOfMedications] = useState([]);

  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      navigate("/login");
    } else {
      axios
        .get("http://localhost:3001/visits/doctor", {
          headers: { accessToken: localStorage.getItem("accessToken") },
        })
        .then((response) => {
          if (
            response.data === "No visits found" ||
            response.data === "doctor not found"
          ) {
            setListOfVisits([]);
          } else {
            setListOfVisits(response.data);
          }
        });
      axios
        .get("http://localhost:3001/visits/doctormedication", {
          headers: { accessToken: localStorage.getItem("accessToken") },
        })
        .then((response) => {
          if (
            response.data === "No medications found" ||
            response.data === "doctor not found"
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
      <div>
        <div className="postPage">
          <div className="leftSide">
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

export default HomeDoctor;
