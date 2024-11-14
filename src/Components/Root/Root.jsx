import Header from "../Header/Header";
import { Outlet } from "react-router-dom";

const Root = () => {
  return (
    <div style={{ textAlign: "center" }}>
      <Header></Header>
      <Outlet></Outlet>
    </div>
  );
};

export default Root;
