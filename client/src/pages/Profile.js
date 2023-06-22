import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../helpers/AuthContext";
import pdf from "../pdf/medicalhistory.pdf";

function Profile() {
  let { authState } = useContext(AuthContext);
  let { id } = useParams();
  let navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [listOfInfos, setListOfInfos] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:3001/auth/info/${id}`).then((response) => {
      setUsername(response.data.username);
    });
    if (!localStorage.getItem("accessToken")) {
      navigate("/login");
    } else {
      axios
        .get(`http://localhost:3001/auth/patientInfo/${id}`, {
          headers: { accessToken: localStorage.getItem("accessToken") },
        })
        .then((response) => {
          setListOfInfos(response.data);
        });
    }
  }, []);
  return (
    <div className="postPage">
      <div className="leftSide">
        <div className="post">
          <h1 className="title">Username: {username}</h1>
          {authState.username === username && (
            <div>
              <button
                className="button"
                onClick={() => {
                  navigate("/changepassword");
                }}
              >
                Change Password
              </button>
            </div>
          )}
          <a
            href={pdf}
            target="_blank"
            rel="noopener noreferrer"
            style={{ marginLeft: "35px" }}
          >
            Medical History File
          </a>

          {authState.username === username && (
            <button
              className="button"
              onClick={() => {
                navigate("/editInfo");
              }}
            >
              Edit your information
            </button>
          )}
        </div>
      </div>
      <div className="rightSide">
        <div className="listOfComments">
          {listOfInfos.map((value, key) => {
            return (
              <div key={key} className="comment">
                <div className="info">
                  <label>Name:</label>
                  <h2>{value.name}</h2>
                  <label>Surname:</label>
                  <h2>{value.surname}</h2>
                  <label>Father's Name:</label>
                  <h2>{value.fatherName}</h2>
                  <label>Age:</label>
                  <h2>{value.age}</h2>
                  <label>Medical Number:</label>
                  <h2>{value.medicalNumber}</h2>
                  <label>Address:</label>
                  <h2>{value.address}</h2>
                  <label>Phone Number:</label>
                  <h2>{value.phoneNumber}</h2>
                  <label>Profession:</label>
                  <h2>{value.profession}</h2>
                  <label>Marital Status:</label>
                  <h2>{value.maritalStatus}</h2>
                  <label>Blood Type:</label>
                  <h2>{value.bloodType}</h2>
                  <label>Allergies:</label>
                  <h2>{value.allergies}</h2>
                  <label>Smoking (packets per day):</label>
                  <h2>{value.smoking}</h2>
                  <label>Drinking (glasses per day):</label>
                  <h2>{value.drinking}</h2>
                  <label>Excercise (days per week):</label>
                  <h2>{value.excercise}</h2>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Profile;
