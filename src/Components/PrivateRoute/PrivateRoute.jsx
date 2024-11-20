import { useContext } from "react";
import { AuthProvider } from "../AuthContext/AuthContext";
import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import { CircularProgress } from "@mui/material";


const PrivateRoute = ({children}) => {
    const {authData, loading} = useContext(AuthProvider);

    if(loading){
        return <CircularProgress color="secondary" />;
    }

    if(authData){
        return children;
    }

    return <Navigate to={'/login'}></Navigate>;
};

PrivateRoute.propTypes = {
    children: PropTypes.node,
}

export default PrivateRoute;