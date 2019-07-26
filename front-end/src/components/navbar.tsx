import React from "react";
import Datepicker from "../components/datepicker";
import Login from "./login";
const materialize = require("react-materialize");

interface IProps {}

const Navbar: React.FC<IProps> = props => {
  return (
    <div>
      <nav className="nav-extended">
        <div className="nav-wrapper">
          <a href="#" className="brand-logo">
            <img
              src="https://image.flaticon.com/icons/png/512/62/62834.png"
              alt="logo"
              width="50px"
            />
            Reserva tu cita
          </a>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            <li className="tab">
              <Login />
              <materialize.Modal
                header="Reserva tu cita"
                trigger={
                  <a className="waves-effect waves-light btn">Reservar cita</a>
                }
                actions={
                  <materialize.Button waves="green" modal="close" flat>
                    Cerrar
                  </materialize.Button>
                }
              >
                <Datepicker />
              </materialize.Modal>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
