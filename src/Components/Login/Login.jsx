import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import app from "../Auth/firebase.init";
import { useState } from "react";
import { Button, TextField } from "@mui/material";

const Login = () => {
  const [userData, setUserData] = useState({});

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

  const HandleLogInFormSubmit = (e) => {
    e.preventDefault();
    console.log("submit form");
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
                id="outlined-basic"
                label="Please Enter Your Email"
                variant="outlined"
                type="email"
                fullWidth
                margin="normal"
              />
              <TextField
                id="outlined-basic"
                label="Please Enter Your Email"
                variant="outlined"
                type="password"
                fullWidth
                margin="normal"
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
