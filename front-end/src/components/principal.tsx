import React from "react";
import { Route } from "react-router";
import Navbar from "./navbar";
import Footer from "./footer";
const materialize = require("react-materialize");

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
          <materialize.Row className="container">
            <materialize.Col m={4} s={12}>
              <div className="card hoverable">
                <div className="card-image waves-effect waves-block waves-light">
                  <img
                    className="activator"
                    src="https://www.factoriacreativabarcelona.es/wp-content/uploads/2018/09/web-responsive.png"
                    height="250px"
                  />
                </div>
                <div className="card-content">
                  <span className="card-title activator grey-text text-darken-4">
                    Diseño responsive
                    <i className="material-icons right">more_vert</i>
                  </span>
                </div>
                <div className="card-reveal">
                  <span className="card-title grey-text text-darken-4">
                    Diseño responsive
                    <i className="material-icons right">close</i>
                  </span>
                  <p>
                    Tus clientes podrán reservar las citas en tu empresa desde
                    cualquier dispositivo
                  </p>
                </div>
              </div>
            </materialize.Col>
            <materialize.Col m={4} s={12}>
              <div className="card hoverable">
                <div className="card-image waves-effect waves-block waves-light">
                  <img
                    className="activator"
                    src="/images/movil-agenda.png"
                    height="250px"
                  />
                </div>
                <div className="card-content">
                  <span className="card-title activator grey-text text-darken-4">
                    Centrate sólo en tu trabajo
                    <i className="material-icons right">more_vert</i>
                  </span>
                </div>
                <div className="card-reveal">
                  <span className="card-title grey-text text-darken-4">
                    Centrate sólo en tu trabajo
                    <i className="material-icons right">close</i>
                  </span>
                  <p>
                    Olvídate de apuntar citas por teléfono. No dediques más
                    tiempo a recitar tu disponibilidad
                  </p>
                </div>
              </div>
            </materialize.Col>
            <materialize.Col m={4} s={12}>
              <div className="card hoverable">
                <div className="card-image waves-effect waves-block waves-light">
                  <img
                    className="activator"
                    src="/images/appointmentsetting.png"
                    height="250px"
                  />
                </div>
                <div className="card-content">
                  <span className="card-title activator grey-text text-darken-4">
                    Tu negocio disponible las 24 horas
                    <i className="material-icons right">more_vert</i>
                  </span>
                </div>
                <div className="card-reveal">
                  <span className="card-title grey-text text-darken-4">
                    Tu negocio disponible las 24 horas
                    <i className="material-icons right">close</i>
                  </span>
                  <p>
                    Acepta reservas a cualquier hora del día, deja que sean tus
                    clientes los que consulten los horarios
                  </p>
                </div>
              </div>
            </materialize.Col>
          </materialize.Row>
          {/* 
          <div className="row container">
            <div className="col s4">
              <img
                src="https://www.factoriacreativabarcelona.es/wp-content/uploads/2018/09/web-responsive.png"
                alt="responsive"
                width="100%"
              />
              <h3 className="grey-text text-darken-3 lighten-3">
                Tus clientes podrán reservar las citas en tu empresa desde
                cualquier dispositivo
              </h3>
            </div>
            <div className="col s4">
              <h3 className="grey-text text-darken-3 lighten-3">
                Olvídate de apuntar citas por teléfono. No dediques más tiempo a
                recitar tu disponibilidad
              </h3>
              <img
                src="/images/movil-agenda.png"
                alt="responsive"
                width="100%"
              />
            </div>
            <div className="col s4">
              <img
                src="/images/appointmentsetting.png"
                alt="responsive"
                width="100%"
              />
              <h3 className="grey-text text-darken-3 lighten-3">
                Acepta reservas a cualquier hora del día, deja que sean tus
                clientes los que consulten los horarios
              </h3>
            </div>
          </div> */}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Principal;
