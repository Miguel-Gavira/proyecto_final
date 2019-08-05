import React from "react";
import Login from "./login";
import Sidenav from "./sidenav";
const materialize = require("react-materialize");

interface IProps {}

const Navbar: React.FC<IProps> = props => {

  
  return (
    <div>
      <materialize.Navbar
        className={"grey darken-4"}
        fixed={true}
        brand={
          <a href="#" className="brand-logo">
            Reserva tu cita
          </a>
        }
        alignLinks="right"
        sidenav={<Sidenav />}
      >
        <materialize.NavItem>
        </materialize.NavItem>
        <materialize.NavItem>
          <Login />
        </materialize.NavItem>
      </materialize.Navbar>
    </div>
  );
};

export default Navbar;
