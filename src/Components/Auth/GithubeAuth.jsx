import { Button } from "@mui/material";
import { useContext } from "react";
import { AuthProvider } from "../AuthContext/AuthContext";

const GithubeAuth = () => {
  const { githubLogIn } = useContext(AuthProvider);

  return (
    <div style={{ marginTop: "20px" }}>
      <Button onClick={githubLogIn} variant="outlined">
        Github Log In
      </Button>
    </div>
  );
};

export default GithubeAuth;
