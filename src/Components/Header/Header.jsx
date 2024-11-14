import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <div>
      <NavLink to={"/"}>Home</NavLink>
      <NavLink to={"/login"}>Log in</NavLink>
      <NavLink to={"/signin"}>Register</NavLink>
    </div>
  );
};

export default Header;
