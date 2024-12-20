import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "../src/Components/Home/Home.jsx";
import Login from "../src/Components/Login/Login.jsx";
import Signin from "../src/Components/Signin/Signin.jsx";
import Root from "./Components/Root/Root.jsx";
import AuthContext from "./Components/AuthContext/AuthContext.jsx";
import OrderItem from "./Components/OrderItem/OrderItem.jsx";
import PrivateRoute from "./Components/PrivateRoute/PrivateRoute.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/signin",
        element: <Signin></Signin>,
      },
      {
        path: "/order",
        element: <PrivateRoute><OrderItem></OrderItem></PrivateRoute>,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthContext>
      <RouterProvider router={router} />
    </AuthContext>
  </StrictMode>
);
