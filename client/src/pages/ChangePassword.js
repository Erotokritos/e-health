import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ChangePassword() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  let navigate = useNavigate();
  const changePassword = () => {
    axios
      .put(
        "http://localhost:3001/auth/changepassword",
        { oldPassword: oldPassword, newPassword: newPassword },
        {
          headers: {
            accessToken: localStorage.getItem("accessToken"),
          },
        }
      )
      .then((response) => {
        if (response.data.error) {
          alert(response.data.error);
        } else {
          alert("Your password changed!");
        }
      });
  };
  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      navigate("/login");
    }
  }, []);

  return (
    <div>
      <h1>Change Your Password</h1>
      <input
        type="password"
        placeholder="Old Passwrod..."
        onChange={(event) => {
          setOldPassword(event.target.value);
        }}
      ></input>
      <input
        type="password"
        placeholder="New Passwrod..."
        onChange={(event) => {
          setNewPassword(event.target.value);
        }}
      ></input>
      <button onClick={changePassword}>Submit</button>
    </div>
  );
}

export default ChangePassword;
