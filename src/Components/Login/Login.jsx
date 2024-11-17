import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { useContext, useState } from "react";
import { Button, TextField } from "@mui/material";
import { NavLink } from "react-router-dom";
import { AuthProvider } from "../AuthContext/AuthContext";

const Login = () => {
  const [userData, setUserData] = useState({});
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signInEmailAndPassword, signOutPeople, authData } =
    useContext(AuthProvider);
  const provider = new GoogleAuthProvider();

  const auth = getAuth();

  const googleAuthProvider = () => {
    signInWithPopup(auth, provider).then((result) => {
      const user = result.user;
      console.log(user);
      setUserData(user);
    });
  };

  const signOutUser = () => {
    signOutPeople(auth).then(() => {});
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
    signInEmailAndPassword(email, password)
      .then((result) => {
        const user = result.user;
        setUserData(user);
      })
      .catch((err) => {
        console.log(err.message, err.code);
      });
    e.refresh();
  };

  return (
    <div>
      {userData.email ? (
        <div>
          <img src={authData?.photoURL} alt="" />
          <h1>{authData?.displayName}</h1>
          <h3>{authData?.email}</h3>
          <Button onClick={signOutUser} variant="contained">
            Sign Out
          </Button>
        </div>
      ) : (
        <div>
          <h1>log In</h1>
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
                required
              />
              <TextField
                id="outlined-basic-password"
                label="Please Enter Your Email"
                variant="outlined"
                type="password"
                fullWidth
                margin="normal"
                onChange={passwordValue}
                required
              />
              <Button
                type="submit"
                style={{ margin: "10px 0", padding: "10px" }}
                variant="contained"
                fullWidth
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
        </div>
      )}
    </div>
  );
};

export default Login;
