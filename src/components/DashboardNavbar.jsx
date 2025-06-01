import { useContext } from "react";
import logo from "../assets/logo.png";
import { AuthContext } from "../context/AuthContext";

const DashboardNavbar = () => {
  const { decodedToken } = useContext(AuthContext);
  console.log("first", decodedToken);
  return (
    <div className="">
      <nav className="m-3 p-3 navbar navbar-light bg-light">
        <div className="container-fluid">
          <a className="navbar-brand">
            <img src={logo} alt="logo" className="w-75" />
          </a>
          <p>{decodedToken.userName}</p>
        </div>
      </nav>
    </div>
  );
};

export default DashboardNavbar;
