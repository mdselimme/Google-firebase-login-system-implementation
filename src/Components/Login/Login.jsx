import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import app from "../Auth/firebase.init";
import { useState } from "react";
import { Button } from "@mui/material";

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

  return (
    <div>
      <h1>login</h1>
      {userData.email ? (
        <Button onClick={signOutUser} variant="contained">
          Sign Out
        </Button>
      ) : (
        <Button onClick={googleAuthProvider} variant="contained">
          Log in
        </Button>
      )}
      <img src={userData?.photoURL} alt="" />
      <h1>{userData?.displayName}</h1>
      <h3>{userData?.email}</h3>
    </div>
  );
};

export default Login;
