import React from "react";
import Footer from "./footer";
import { Element, scroller } from "react-scroll";
const materialize = require("react-materialize");
const Flippy = require("react-flippy");

interface IProps {}

const Principal: React.FC<IProps> = props => {
  const scrollType = {
    duration: 500,
    delay: 50,
    smooth: true,
    offset: -80
  };

  const goToSection1 = () => {
    scroller.scrollTo("section1", scrollType);
  };
  return (
    <>
      <div className="fondoCompanies">
        <div className="principal">
          <div className="introCompanies z-depth-5">
            <h1 className="center eslogan container">
              Imagina poder atender a tus clientes las 24 horas
              <i
                onClick={goToSection1}
                className="material-icons large iconDown"
              >
                arrow_drop_down_circle
              </i>
            </h1>
          </div>
          <Element name="section1">
            <div className="section white z-depth-5">
              <materialize.Carousel
                options={{ fullWidth: true, indicators: true, duration: 100 }}
                className="dark-text"
              >
                <div className="white diapos diapo1 center row">
                  <div className="col s12 l4 offset-l1">
                    <h2>
                      ¿Quieres que tus clientes reserven citas a cualquier hora
                      del día?
                    </h2>
                    <p>
                      Registrate en nuestra aplicación, rellena los datos de tu
                      empresa y actualiza tus horarios de apertura.
                    </p>
                  </div>
                  <div className="col s12 offset-l1 l3 left">
                    <img src="/images/registro.png" alt="registro" />
                  </div>
                </div>
                <div className="white diapos diapo2 center row">
                  <div className="col s12 l6 center ">
                    <img
                      src="/images/nostrosnosencargamos.png"
                      alt="nostrosnosencargamos"
                    />
                  </div>
                  <div className="col s12 l4 center texto">
                    <h2>
                      Ya lo tienes todo listo, centrate en trabajar, nosotros
                      nos encargamos de todo.
                    </h2>
                    <p>
                      La aplicación generará automáticamente una url
                      personalizada para tu empresa. Así tus clientes podrán ver
                      la disponibilidad de tus citas a cualquier hora.
                    </p>
                  </div>
                </div>
              </materialize.Carousel>
            </div>
          </Element>
          <Element name="section2">
            <div className="white cardPanel">
              <materialize.Row className="container">
                <materialize.Col className="características" m={4} s={12}>
                  <Flippy.Flippy
                    style={{ width: "100%", height: "65vh" }}
                    flipOnHover={true}
                    flipOnClick={true}
                  >
                    <Flippy.FrontSide
                      style={{ backgroundColor: "rgb(255, 255, 255, 0.6)" }}
                    >
                      <div>
                        <div>
                          <img
                            src="/images/web-responsive.png"
                            width="100%"
                            alt="Diseño responsive"
                          />
                        </div>
                        <div>
                          <h4 className="center grey-text text-darken-4">
                            Diseño responsive
                          </h4>
                        </div>
                      </div>
                    </Flippy.FrontSide>
                    <Flippy.BackSide
                      style={{ backgroundColor: "rgb(255, 255, 255, 0.6)" }}
                    >
                      <div>
                        <div>
                          <h4 className="center grey-text text-darken-4">
                            Diseño responsive
                          </h4>
                          <div className="divider"></div>
                          <h5 className="center">
                            Tus clientes podrán reservar las citas en tu empresa
                            desde cualquier dispositivo
                          </h5>
                        </div>
                      </div>
                    </Flippy.BackSide>
                  </Flippy.Flippy>
                </materialize.Col>
                <materialize.Col className="características" m={4} s={12}>
                  <Flippy.Flippy
                    style={{ width: "100%", height: "65vh" }}
                    flipOnHover={true}
                    flipOnClick={true}
                  >
                    <Flippy.FrontSide
                      style={{ backgroundColor: "rgb(255, 255, 255, 0.6)" }}
                    >
                      <div>
                        <div>
                          <img
                            src="/images/movil-agenda.png"
                            alt="Céntrate sólo en tu trabajo"
                            width="100%"
                          />
                        </div>
                        <div>
                          <h4 className="center grey-text text-darken-4">
                            Céntrate sólo en tu trabajo
                          </h4>
                        </div>
                      </div>
                    </Flippy.FrontSide>
                    <Flippy.BackSide
                      style={{ backgroundColor: "rgb(255, 255, 255, 0.6)" }}
                    >
                      <div>
                        <div>
                          <h4 className="center grey-text text-darken-4">
                            Céntrate sólo en tu trabajo
                          </h4>
                          <div className="divider"></div>
                          <h5 className="center">
                            Olvídate de apuntar citas por teléfono. No dediques
                            más tiempo a recitar tu disponibilidad
                          </h5>
                        </div>
                      </div>
                    </Flippy.BackSide>
                  </Flippy.Flippy>
                </materialize.Col>
                <materialize.Col className="características" m={4} s={12}>
                  <Flippy.Flippy
                    style={{ width: "100%", height: "65vh" }}
                    flipOnHover={true}
                    flipOnClick={true}
                  >
                    <Flippy.FrontSide
                      style={{ backgroundColor: "rgb(255, 255, 255, 0.6" }}
                    >
                      <div>
                        <div>
                          <img
                            src="/images/appointmentsetting.png"
                            alt="Tu negocio disponible las 24 horas"
                            width="100%"
                          />
                        </div>
                        <div>
                          <h4 className="center grey-text text-darken-4">
                            Tu negocio disponible las 24 horas
                          </h4>
                        </div>
                      </div>
                    </Flippy.FrontSide>
                    <Flippy.BackSide
                      style={{ backgroundColor: "rgb(255, 255, 255, 0.6)" }}
                    >
                      <div>
                        <div>
                          <h4 className="center grey-text text-darken-4">
                            Tu negocio disponible las 24 horas
                          </h4>
                          <div className="divider"></div>
                          <h5 className="center">
                            Acepta reservas a cualquier hora del día, deja que
                            sean tus clientes los que consulten los horarios
                          </h5>
                        </div>
                      </div>
                    </Flippy.BackSide>
                  </Flippy.Flippy>
                </materialize.Col>
              </materialize.Row>
            </div>
          </Element>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Principal;
