import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import app from "../Auth/firebase.init";
import { useState } from "react";

const Login = () => {
  const [userData, setUserData] = useState(null);

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
    signOut(auth).then((data) => {
      console.log(data);
    });
  };

  return (
    <div>
      <h1>login</h1>
      <button onClick={userData.email ? signOutUser : googleAuthProvider}>
        {userData.email ? "Log Out" : "Log In"}
      </button>
      <img src={userData.photoURL} alt="" />
      <h1>{userData.displayName}</h1>
      <h3>{userData.email}</h3>
    </div>
  );
};

export default Login;
