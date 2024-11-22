import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { Button, TextField } from "@mui/material";
import { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthProvider } from "../AuthContext/AuthContext";

const Signin = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { createUser, setAuthData, setLoader } = useContext(AuthProvider);
  const provider = new GoogleAuthProvider();

  const auth = getAuth();

  const navigate = useNavigate();

  const googleAuthProvider = () => {
    signInWithPopup(auth, provider).then((result) => {
      const user = result.user;
      setAuthData(user);
      setLoader(false);
      console.log(user);
      navigate("/");
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
    createUser(email, password)
      .then((result) => {
        updateProfile(auth.currentUser, {
          displayName: name,
        });
        navigate("/");
        setAuthData(result.user);
        setLoader(false);
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
            <TextField
              id="outlined-basic-name"
              label="Please Enter Your FullName"
              variant="outlined"
              type="text"
              fullWidth
              margin="normal"
              onChange={nameValue}
              required
            />
            <TextField
              id="outlined-basic-email"
              label="Please Enter Your Email"
              variant="outlined"
              type="email"
              fullWidth
              margin="normal"
              onChange={emailValue}
              required
            />
            <TextField
              id="outlined-basic-password"
              label="Please Enter Your Password"
              variant="outlined"
              type="password"
              fullWidth
              margin="normal"
              onChange={passwordValue}
              required
            />
            <Button
              type="submit"
              variant="contained"
              style={{ margin: "10px 0", padding: "10px" }}
              fullWidth
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
