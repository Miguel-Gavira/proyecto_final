import React from "react";
import AddCompany from "./addCompany";
import { Route } from "react-router";
import Navbar from "./navbar";

interface IProps {}

const Principal: React.FC<IProps> = props => {
  return (
    <div className="fondoCompanies">
      <Route component={Navbar} />
      <div className="principal">
        <div className="introCompanies">
          <h1 className="center eslogan container">
            Imagina poder atender a tus clientes las 24 horas
          </h1>
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
            <div className="col s7">
              <h3 className="grey-text text-darken-3 lighten-3">
                Olvídate de apuntar citas por teléfono. No dediques más tiempo a
                recitar tu disponiblidad, deja que sean tus clientes los que
                consulten los horarios
              </h3>
            </div>
            <div className="col s5">
              <img
                src="/images/movil-agenda.png"
                alt="responsive"
                width="100%"
              />
            </div>
            <div className="col s5">
              <img
                src="/images/appointmentsetting.png"
                alt="responsive"
                width="100%"
              />
            </div>
            <div className="col s7">
  
              <h3 className="grey-text text-darken-3 lighten-3">
                Acepta reservas a cualquier hora del día
              </h3>
            </div>
          </div>
        </div>
      </div>
      <Route path="/addCompany" exact component={AddCompany} />
    </div>
  );
};

export default Principal;
