import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { Button, TextField } from "@mui/material";
import { useState } from "react";
import app from "../Auth/firebase.init";
import { NavLink } from "react-router-dom";

const Signin = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();

  const googleAuthProvider = () => {
    signInWithPopup(auth, provider).then((result) => {
      const user = result.user;
      console.log(user);
    });
  };

  const nameValue = (e) => {
    setName(e.target.value);
  };

  const emailValue = (e) => {
    setEmail(e.target.value);
  };

  const passwordValue = (e) => {
    setPassword(e.target.value);
  };

  const HandleLogInFormSubmit = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        console.log(result.user);
      })
      .catch((error) => {
        console.log(error.message, error.code);
      });
  };
  return (
    <div>
      <h1>Sign In</h1>
      <>
        <div style={{ width: "500px", margin: "0 auto" }}>
          <form onSubmit={HandleLogInFormSubmit}>
            {/* <TextField
              id="outlined-basic-name"
              label="Please Enter Your FullName"
              variant="outlined"
              type="text"
              fullWidth
              margin="normal"
              onChange={nameValue}
            /> */}
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
              label="Please Enter Your Password"
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
              Sign In
            </Button>
          </form>
          <Button onClick={googleAuthProvider} variant="contained">
            Google Sign In
          </Button>
          <p>
            {" "}
            Already Account ? Go to
            <NavLink style={{ marginLeft: "8px" }} to={"/login"}>
              Log In
            </NavLink>
          </p>
        </div>
      </>
    </div>
  );
};

export default Signin;
