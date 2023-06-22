import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../helpers/AuthContext";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
function FindPatient() {
  let { authState } = useContext(AuthContext);
  let navigate = useNavigate();

  const [listOfMedications, setListOfMedications] = useState([]);
  const [listOfVisits, setListOfVisits] = useState([]);
  const [patientsUserId, setPatientsUserId] = useState("");

  const [medicalNumber, setMedicalNumber] = useState("");
  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      navigate("/login");
    }
  }, []);

  const onSubmit = () => {
    if (medicalNumber === "") {
      alert("You have to enter a medical number");
    } else {
      axios
        .get(`http://localhost:3001/auth/findPatient/${medicalNumber}`, {
          headers: { accessToken: localStorage.getItem("accessToken") },
        })
        .then((response) => {
          if (response.data === "Patient not found") {
            alert(response.data);
          } else {
            setListOfMedications(response.data.listOfMedications);
            setListOfVisits(response.data.listOfVisits);
            setPatientsUserId(response.data.userId);
          }
        });
    }
  };

  const goToProfile = () => {
    navigate(`/profile/${patientsUserId}`);
  };

  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      navigate("/login");
    }
  }, []);

  return (
    <div>
      <input
        type="text"
        placeholder="Search"
        onChange={(event) => {
          setMedicalNumber(event.target.value);
        }}
      />
      <button type="submit" onClick={onSubmit}>
        Search
      </button>
      {patientsUserId && (
        <div>
          <div>
            <button onClick={goToProfile}>Go to patient's profile</button>
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
      )}
    </div>
  );
}

export default FindPatient;
