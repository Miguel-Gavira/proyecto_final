import React from "react";
import { Route } from "react-router";
import Navbar from "./navbar";
import Footer from "./footer";
const materialize = require("react-materialize");
const Flippy = require("react-flippy");

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
              <Flippy.Flippy flipOnHover={true} flipOnClick={true}>
                <Flippy.FrontSide>
                  <div className="">
                    <div className="">
                      <img
                        className=""
                        src="https://www.factoriacreativabarcelona.es/wp-content/uploads/2018/09/web-responsive.png"
                        width="100%"
                      />
                    </div>
                    <div className="">
                      <h4 className="center grey-text text-darken-4">
                        Diseño responsive
                      </h4>
                    </div>
                  </div>
                </Flippy.FrontSide>
                <Flippy.BackSide>
                  <div className="">
                    <div className="">
                      <h4 className="center grey-text text-darken-4">
                        Diseño responsive
                      </h4>
                      <br />
                      <h5 className="center">
                        Tus clientes podrán reservar las citas en tu empresa
                        desde cualquier dispositivo
                      </h5>
                    </div>
                  </div>
                </Flippy.BackSide>
              </Flippy.Flippy>
            </materialize.Col>
            <materialize.Col m={4} s={12}>
              <Flippy.Flippy flipOnHover={true} flipOnClick={true}>
                <Flippy.FrontSide>
                  <div className="">
                    <div className="">
                      <img
                        className=""
                        src="/images/movil-agenda.png"
                        width="100%"
                      />
                    </div>
                    <div className="">
                      <h4 className="center grey-text text-darken-4">
                        Centrate sólo en tu trabajo
                      </h4>
                    </div>
                  </div>
                </Flippy.FrontSide>
                <Flippy.BackSide>
                  <div className="">
                    <div className="">
                      <h4 className="center grey-text text-darken-4">
                        Centrate sólo en tu trabajo
                      </h4>
                      <br />
                      <h5 className="center">
                        Olvídate de apuntar citas por teléfono. No dediques más
                        tiempo a recitar tu disponibilidad
                      </h5>
                    </div>
                  </div>
                </Flippy.BackSide>
              </Flippy.Flippy>
            </materialize.Col>
            <materialize.Col m={4} s={12}>
              <Flippy.Flippy flipOnHover={true} flipOnClick={true}>
                <Flippy.FrontSide>
                  <div className="">
                    <div className="">
                      <img
                        className=""
                        src="/images/appointmentsetting.png"
                        width="100%"
                      />
                    </div>
                    <div className="">
                      <h4 className="center grey-text text-darken-4">
                        Tu negocio disponible las 24 horas
                      </h4>
                    </div>
                  </div>
                </Flippy.FrontSide>
                <Flippy.BackSide>
                  <div className="">
                    <div className="">
                      <h4 className="center grey-text text-darken-4">
                        Tu negocio disponible las 24 horas
                      </h4>
                      <br />
                      <h5 className="center">
                        Acepta reservas a cualquier hora del día, deja que sean
                        tus clientes los que consulten los horarios
                      </h5>
                    </div>
                  </div>
                </Flippy.BackSide>
              </Flippy.Flippy>
            </materialize.Col>
          </materialize.Row>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Principal;
