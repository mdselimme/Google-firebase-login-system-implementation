import {
  createUserWithEmailAndPassword,
  getAuth,
  GithubAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import PropTypes from "prop-types";
import { createContext, useEffect, useState } from "react";
import app from "../Auth/firebase.init";

// eslint-disable-next-line react-refresh/only-export-components
export const AuthProvider = createContext(null);

const AuthContext = ({ children }) => {
  const [authData, setAuthData] = useState(null);
  const [loading, setLoading] = useState(false);
  const auth = getAuth(app);

  const githubProvider = new GithubAuthProvider();

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signInEmailAndPassword = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const signOutPeople = () => {
    setLoading(true);
    return signOut(auth);
  };

  const githubLogIn = () => {
    signInWithPopup(auth, githubProvider)
      .then((result) => {
        const user = result.user;
        console.log(user);
      })
      .catch((erro) => {
        console.log(erro.message);
      });
  };

  useEffect(() => {
    setLoading(true);
    const unsubcribed = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setAuthData(currentUser);
        setLoading(false);
      }
      return () => unsubcribed();
    });
  }, [auth]);

  const authInfo = {
    githubLogIn,
    loading,
    authData,
    createUser,
    signOutPeople,
    signInEmailAndPassword,
    setAuthData,
  };

  return (
    <AuthProvider.Provider value={authInfo}>{children}</AuthProvider.Provider>
  );
};

export default AuthContext;
AuthContext.propTypes = {
  children: PropTypes.node,
};
