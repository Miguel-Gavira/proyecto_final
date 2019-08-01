import React from "react";
import Login from "./login";
import Sidenav from "./sidenav";

const materialize = require("react-materialize");

interface IProps {}

const Principal: React.FC<IProps> = props => {
  return (
    <div className="fondoCompanies">
      <materialize.Navbar
        className={"transparent z-depth-0"}
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
          <Login />
        </materialize.NavItem>
      </materialize.Navbar>
      <div>
        <div className="introCompanies">
          <h1 className="center eslogan container">Imagina poder atender a tus clientes las 24 horas</h1>
        </div>
        <div className="section white z-depth-5">
          <div className="row container">
            <h2 className="header center">Diseño responsive</h2>
            <div className="col s5">
              <img
                src="https://www.factoriacreativabarcelona.es/wp-content/uploads/2018/09/web-responsive.png"
                alt="responsive"
                width="100%"
              />
            </div>
            <div className="col s7">
              <h3 className="grey-text text-darken-3 lighten-3">
                Tus clientes podrán reservar las citas en tu empresa desde
                cualquier dispositivo   
              </h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Principal;
