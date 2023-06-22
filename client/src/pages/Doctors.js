import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

function Doctors() {
  let navigate = useNavigate();
  const [listOfDoctors, setListOfDoctors] = useState([]);
  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      navigate("/login");
    } else {
      axios
        .get("http://localhost:3001/auth/doctors", {
          headers: { accessToken: localStorage.getItem("accessToken") },
        })
        .then((response) => {
          setListOfDoctors(response.data);
        });
    }
  }, []);
  return (
    <div>
      <h1>Doctors</h1>

      {listOfDoctors.map((value, key) => {
        return (
          <div
            className="post"
            key={key}
            type="body"
            onClick={() => {
              navigate(`/doctorprofile/${value.UserId}`);
            }}
          >
            <div className="body">
              <label>Name:</label>
              <h2>{value.name}</h2>
              <label>Surname:</label>
              <h2>{value.surname}</h2>
              <label>Specialty:</label>
              <h2>{value.specialty}</h2>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Doctors;
