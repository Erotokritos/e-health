import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../helpers/AuthContext";

function Login() {
  const [username, setUsername] = useState([""]);
  const [password, setPassword] = useState([""]);
  const { authState, setAuthState } = useContext(AuthContext);

  let navigate = useNavigate();
  const login = () => {
    const data = { username: username, password: password };
    axios.post("http://localhost:3001/auth/login", data).then((response) => {
      if (response.data.error) {
        alert(response.data.error);
      } else {
        localStorage.setItem("accessToken", response.data.token);
        setAuthState({
          username: response.data.username,
          id: response.data.id,
          status: true,
          role: response.data.typeOfUser,
        });
        if (response.data.typeOfUser === "Patient") {
          navigate("/homepatient");
        } else {
          navigate("/homedoctor");
        }
      }
    });
  };

  return (
    <div>
      {!authState.status && (
        <div className="loginContainer">
          <label>Username</label>
          <input
            type="text"
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          ></input>
          <label>Password</label>
          <input
            type="password"
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          ></input>
          <button onClick={login}>Login</button>
        </div>
      )}
    </div>
  );
}

export default Login;
