import { createContext, useContext } from "react";

import React from "react";

const AuthContext = ({ children }) => {
  export const levelContext = createContext(null);
  return;
  <AuthContext.Provider></AuthContext.Provider>;
};

export default AuthContext;
