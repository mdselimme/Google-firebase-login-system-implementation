import {
  getAuth,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import app from "../Auth/firebase.init";
import { useState } from "react";
import { Button, TextField } from "@mui/material";
import { NavLink } from "react-router-dom";

const Login = () => {
  const [userData, setUserData] = useState({});
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();

  const googleAuthProvider = () => {
    signInWithPopup(auth, provider).then((result) => {
      const user = result.user;
      console.log(user);
      setUserData(user);
    });
  };

  const signOutUser = () => {
    signOut(auth).then(() => {
      setUserData({});
    });
  };

  const emailValue = (e) => {
    setEmail(e.target.value);
  };

  const passwordValue = (e) => {
    setPassword(e.target.value);
  };

  const HandleLogInFormSubmit = (e) => {
    e.preventDefault();
    console.log(email, password);
    signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        const user = result.user;
        console.log(user);
      })
      .catch((err) => {
        console.log(err.message, err.code);
      });
  };

  return (
    <div>
      <h1>login</h1>
      {userData.email ? (
        <Button onClick={signOutUser} variant="contained">
          Sign Out
        </Button>
      ) : (
        <>
          <div style={{ width: "500px", margin: "0 auto" }}>
            <form onSubmit={HandleLogInFormSubmit}>
              <TextField
                id="outlined-basic-email"
                label="Please Enter Your Email"
                variant="outlined"
                type="email"
                fullWidth
                margin="normal"
                onChange={emailValue}
              />
              <TextField
                id="outlined-basic-password"
                label="Please Enter Your Email"
                variant="outlined"
                type="password"
                fullWidth
                margin="normal"
                onChange={passwordValue}
              />
              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{ margin: "10px", padding: "10px" }}
              >
                Log In
              </Button>
            </form>
            <Button onClick={googleAuthProvider} variant="contained">
              Google Sign In
            </Button>
            <p>
              {" "}
              No Account ? Go to
              <NavLink to={"/signin"} style={{ marginLeft: "8px" }}>
                Register
              </NavLink>
            </p>
          </div>
        </>
      )}
      <img src={userData?.photoURL} alt="" />
      <h1>{userData?.displayName}</h1>
      <h3>{userData?.email}</h3>
    </div>
  );
};

export default Login;
