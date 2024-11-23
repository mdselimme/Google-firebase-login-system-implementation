import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import IconButton from "@mui/material/IconButton";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthProvider } from "../AuthContext/AuthContext";
import { Button } from "@mui/material";
// import MenuIcon from "@mui/icons-material/Menu";
const Header = () => {
  const { authData, signOutPeople, setAuthData } = useContext(AuthProvider);

  const navigate = useNavigate();

  const signOutFromApp = () => {
    signOutPeople()
      .then(() => {
        setAuthData({});
        navigate("/login");
      })
      .catch((err) => {
        console.log(err);
      });
    console.log("sighn out");
  };

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" sx={{ bgcolor: "white", color: "#010001" }}>
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              component="div"
              fontWeight={"800"}
              sx={{ flexGrow: 1 }}
            >
              <Link
                to={"/"}
                style={{ textDecoration: "none", fontSize: "3rem" }}
              >
                Firebase Authentication
              </Link>
            </Typography>
            <NavLink
              style={{
                margin: "0 20px",
                textDecoration: "none",
                color: "#010001",
              }}
              to={"/"}
            >
              Home
            </NavLink>
            <NavLink
              style={{
                margin: "0 20px",
                textDecoration: "none",
                color: "#010001",
              }}
              to={"/order"}
            >
              Order
            </NavLink>
            {authData?.displayName ? (
              <>
                <NavLink
                  style={{
                    margin: "0 20px",
                    textDecoration: "none",
                    color: "#010001",
                  }}
                >
                  {authData?.displayName}
                </NavLink>
                <Button onClick={signOutFromApp} variant="contained">
                  Sign Out
                </Button>
              </>
            ) : (
              <>
                <NavLink
                  style={{
                    margin: "0 20px",
                    textDecoration: "none",
                    color: "#010001",
                  }}
                  to={"/login"}
                >
                  Log In
                </NavLink>
                <NavLink
                  style={{
                    margin: "0 20px",
                    textDecoration: "none",
                    color: "#010001",
                  }}
                  to={"/signin"}
                >
                  Sign In
                </NavLink>
              </>
            )}
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  );
};

export default Header;
