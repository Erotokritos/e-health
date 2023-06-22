import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes as Switch,
  Link,
} from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "./helpers/AuthContext";
import HomePatient from "./pages/HomePatient";
import Registration from "./pages/Registration";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import Profile from "./pages/Profile";
import ChangePassword from "./pages/ChangePassword";
import Doctors from "./pages/Doctors";
import logo from "./images/ehealthicon.ico";
import EditInfo from "./pages/EditInfo";
import EnterVisit from "./pages/EnterVisit";
import DoctorEditInfo from "./pages/DoctorEditInfo";
import DoctorProfile from "./pages/DoctorProfile";
import HomeDoctor from "./pages/HomeDoctor";
import FindPatient from "./pages/FindPatient";

function App() {
  const [authState, setAuthState] = useState({
    username: "",
    id: 0,
    status: false,
    typeOfUser: "",
  });

  const logout = () => {
    localStorage.removeItem("accessToken");
    setAuthState({ username: "", id: 0, status: false, typeOfUser: "" });
    window.location.reload();
  };
  useEffect(() => {
    axios
      .get("http://localhost:3001/auth/token", {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then((response) => {
        if (response.data.error) {
          setAuthState({ ...authState, status: false });
        } else {
          setAuthState({
            username: response.data.username,
            id: response.data.id,
            status: true,
            typeOfUser: response.data.typeOfUser,
          });
        }
      });
  }, [authState]);

  return (
    <div className="App">
      <AuthContext.Provider value={{ authState, setAuthState }}>
        <Router>
          <div className="navbar">
            <div className="links">
              <div></div>
              {!authState.status && (
                <>
                  <Link to="/login"> Login</Link>
                  <Link to="/registration"> Registration</Link>
                </>
              )}
              {authState.status && authState.typeOfUser === "Patient" && (
                <>
                  <Link to="/homepatient">Home</Link>
                  <Link to="/doctors">Doctors</Link>
                  <Link to={`/profile/${authState.id}`}>Profile</Link>
                </>
              )}
              {authState.status && authState.typeOfUser === "Doctor" && (
                <>
                  <Link to="/homedoctor">Your Home</Link>
                  <Link to="/entervisit">Visit & Medication</Link>
                  <Link to="/findPatient">Find Patient</Link>
                  <Link to={`/doctorprofile/${authState.id}`}>Profile</Link>
                </>
              )}
            </div>
            <h3>e-</h3>
            <h3>Health</h3>
            <img className="logo" src={logo} alt="Logo" />
            <h3>App</h3>
            <div className="loggedInContainer">
              <h1>{authState.username} </h1>
              {authState.status && <button onClick={logout}> Logout</button>}
            </div>
          </div>
          <Switch>
            <Route path="/login" element={<Login />} />
            <Route path="/homepatient" element={<HomePatient />} />
            <Route path="/homedoctor" element={<HomeDoctor />} />
            <Route path="/registration" element={<Registration />} />
            <Route path="/profile/:id" element={<Profile />} />
            <Route path="/changepassword" element={<ChangePassword />} />
            <Route path="/doctors" element={<Doctors />} />
            <Route path="/editInfo" element={<EditInfo />} />
            <Route path="/entervisit" element={<EnterVisit />} />
            <Route path="/findPatient" element={<FindPatient />} />
            <Route path="/doctoreditinfo" element={<DoctorEditInfo />} />
            <Route path="/doctorprofile/:id" element={<DoctorProfile />} />
            <Route path="*" element={<PageNotFound />} />
          </Switch>
        </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
