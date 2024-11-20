import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import PropTypes from "prop-types";
import { createContext, useEffect, useState } from "react";
import app from "../Auth/firebase.init";

// eslint-disable-next-line react-refresh/only-export-components
export const AuthProvider = createContext(null);

const AuthContext = ({ children }) => {
  const [authData, setAuthData] = useState(null);
  const [loading, setLoading] = useState(true);
  const auth = getAuth(app);

  const createUser = (email, password) => {
    setLoading(true)
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signInEmailAndPassword = (email, password) => {
    setLoading(true)
    return signInWithEmailAndPassword(auth, email, password);
  };

  const signOutPeople = () => {
    setLoading(true)
    return signOut(auth);
  };

  useEffect(() => {
    const unsubcribed = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setAuthData(currentUser);
        setLoading(false)
      }
      return () => unsubcribed();
    });
  }, [auth]);

  const authInfo = {
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
