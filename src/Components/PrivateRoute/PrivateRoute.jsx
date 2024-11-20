import { useContext } from "react";
import { AuthProvider } from "../AuthContext/AuthContext";
import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";


const PrivateRoute = ({children}) => {
    const {authData} = useContext(AuthProvider);

    if(authData){
        return children;
    }

    return <Navigate to={'/login'}></Navigate>;
};

PrivateRoute.propTypes = {
    children: PropTypes.node,
}

export default PrivateRoute;