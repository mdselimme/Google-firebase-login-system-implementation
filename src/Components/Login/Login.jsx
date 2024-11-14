import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import app from "../Auth/firebase.init";
import { useState } from "react";

const Login = () => {
  const [userData, setUserData] = useState({});

  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();

  const googleAuthProvider = () => {
    signInWithPopup(auth, provider).then((result) => {
      const user = result.user;
      console.log(user.photoURL);
      setUserData(user);
    });
  };

  return (
    <div>
      <h1>login</h1>
      <button onClick={googleAuthProvider}>Log in with Google</button>
      <img src={userData.photoURL} alt="" />
      <h1>{userData.displayName}</h1>
      <h3>{userData.email}</h3>
    </div>
  );
};

export default Login;
