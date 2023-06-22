import React, { useEffect, useState, useContext } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../helpers/AuthContext";

function DoctorProfile() {
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
        .get(`http://localhost:3001/auth/doctorInfo/${id}`, {
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
            <button
              onClick={() => {
                navigate("/changepassword");
              }}
            >
              Change Password
            </button>
          )}

          {authState.username === username && (
            <Link style={{ marginLeft: "50px" }} to="/doctoreditinfo">
              Edit Your Info
            </Link>
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
                  <label>Address:</label>
                  <h2>{value.address}</h2>
                  <label>Licsence Number:</label>
                  <h2>{value.doctorNumber}</h2>
                  <label>Phone Number</label>
                  <h2>{value.phoneNumber}</h2>
                  <label>Bio:</label>
                  <h2>{value.bio}</h2>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default DoctorProfile;
