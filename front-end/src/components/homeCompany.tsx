import React from "react";
import { connect } from "react-redux";
import * as actions from "../actions";
import { IGlobalState } from "../reducers/reducers";
import { DateTime } from "luxon";
import { ICompany } from "../ICompany";
import { IUser } from "../IUser";
import Footer from "./footer";
import { Element, scroller } from "react-scroll";
import { RouteComponentProps } from "react-router";

const materialize = require("react-materialize");
const Flippy = require("react-flippy");

interface IProps {}

interface IPropsGlobal {
  token: string;
  user: IUser;
  appointment: DateTime;
  company: ICompany;
  setCompany: (company: ICompany) => void;
  setUser: (user: IUser) => void;
}

const HomeCompany: React.FC<
  IProps & IPropsGlobal & RouteComponentProps
> = props => {

  //Datos del scroll
  const scrollType = {
    duration: 500,
    delay: 50,
    smooth: true,
    offset: -80
  };

  //Función para hacer scroll auto al carrusel
  const goToSection1 = () => {
    scroller.scrollTo("section1", scrollType);
  };

  //Función para voltear una card
  const addClass = (i: number) => {
    const el: any = document.getElementsByClassName("flippy-cardContainer")[i];
    el.classList.add("isActive");
  };

  //Función para volver al estado inicial una card
  const removeClass = (i: number) => {
    const el: any = document.getElementsByClassName("flippy-cardContainer")[i];
    el.classList.remove("isActive");
  };

  //Función para eliminar una cita por parte del usuario
  const deleteAppointment = () => {
    fetch(
      "http://localhost:8080/api/appointment/delete/" +
        props.user.idAppointment +
        "/" +
        props.user._id,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + props.token
        }
      }
    ).then(response => {
      if (response.ok) {
        const dataUser: IUser = {
          ...props.user,
          appointment: "",
          idAppointment: ""
        };
        props.setUser(dataUser);
      }
    });
  };

  //Hook para cargar los datos de la empresa
  React.useEffect(() => {
    const params: any = props.match.params;
    fetch("http://localhost:8080/api/company/" + params.companyId, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    }).then(response => {
      if (response.ok) {
        response.json().then(documents => {
          const dataCompany: ICompany = {
            _id: documents._id,
            companyName: documents.companyName,
            owner: documents.owner === props.user._id ? documents.owner : "",
            address: documents.address,
            telephone: documents.telephone,
            type: documents.type,
            email: documents.email,
            appointmentDuration: documents.appointmentDuration
          };
          props.setCompany(dataCompany);
        });
      }
    }); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.token]);

  //Hook para verificar si el usuario registrado tiene cita y en caso
  //afirmativo cargar los datos en redux
  React.useEffect(() => {
    if (props.company._id && props.user._id && props.token) {
      fetch(
        "http://localhost:8080/api/appointment/" +
          props.company._id +
          "/" +
          props.user._id,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + props.token
          }
        }
      ).then(response => {
        if (response.ok) {
          response.json().then(
            documents => {
              if (DateTime.local() < DateTime.fromISO(documents.appointment)) {
                const dataUser: IUser = {
                  ...props.user,
                  appointment: DateTime.fromISO(
                    documents.appointment
                  ).toString(),
                  idAppointment: documents._id
                };
                props.setUser(dataUser);
              }
            },
            () => {}
          );
        }
      });
    } // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    props.token,
    props.company._id,
    props.user._id,
    props.user.idAppointment
  ]);

  return (
    <div className="fondoCompanies">
      <div className="principal">
        <div className="introCompanies z-depth-5">
          <h1 className="center eslogan container animated fadeInUp">
            {props.user.appointment && props.company.owner !== props.user._id
              ? "Ya tienes una cita con nosotros"
              : "¿Quieres reservar una cita?"}
            <i onClick={goToSection1} className="material-icons large iconDown">
              arrow_drop_down_circle
            </i>
          </h1>
        </div>
        <Element name="section1">
          {(props.user.appointment === "" ||
            props.company.owner === props.user._id) && (
            <div className="section white z-depth-5">
              <materialize.Carousel
                options={{ fullWidth: true, indicators: true, duration: 100 }}
                className="dark-text"
              >
                <div className="white diapos diapo1 center row">
                  <div className="col s12 l4 offset-l1">
                    <h2>¿Quieres reservar una cita con nosotros?</h2>
                    <p>
                      Registrate y consulta la disponibilidad. Sin esperas,
                      cómodo y fácil, estés donde estés.
                    </p>
                  </div>
                  <div className="col s12 offset-l1 l3 left">
                    <img src="/images/registro2.png" alt="registro" />
                  </div>
                </div>
                <div className="white diapos diapo2 center row">
                  <div className="col s12 l6 center ">
                    <img
                      src="/images/registroUsuarios.png"
                      alt="registroUsuarios"
                    />
                  </div>
                  <div className="col s12 l4 center texto">
                    <h2>
                      Recuerda cancelar una cita si no vas a poder asistir
                    </h2>
                    <p>Siempre podrás solicitar una nueva si la necesitas</p>
                  </div>
                </div>
              </materialize.Carousel>
            </div>
          )}
          {props.token &&
            props.company.owner !== props.user._id &&
            DateTime.local() < DateTime.fromISO(props.user.appointment) && (
              <div className="section white z-depth-5">
                <materialize.Row>
                  <materialize.Col m={12} s={12}>
                    <materialize.Card
                      className="postit transparent z-depth-0"
                      header={
                        <div className="insidePostit">
                          <img
                            src="/images/postit.png"
                            width="100%"
                            alt="postit"
                          />
                          <div className="cardText">
                            <h2 className="flow-text">Tienes una cita</h2>
                            <h5 className="flow-text">
                              HORA:
                              {DateTime.fromISO(props.user.appointment)
                                .setLocale("es")
                                .toFormat(" HH:mm")}
                            </h5>
                            <h5 className="flow-text center">
                              DÍA:
                              <span>
                                {DateTime.fromISO(props.user.appointment)
                                  .setLocale("es")
                                  .toFormat(" EEEE")
                                  .toLocaleUpperCase()}
                              </span>
                              , <br />
                              <span>
                                {DateTime.fromISO(props.user.appointment)
                                  .setLocale("es")
                                  .toFormat("dd LLLL yyyy")
                                  .toLocaleUpperCase()}
                              </span>
                            </h5>
                            <h5
                              className="deletePostit flow-text"
                              onClick={deleteAppointment}
                            >
                              Eliminar
                            </h5>
                          </div>
                        </div>
                      }
                    ></materialize.Card>
                  </materialize.Col>
                </materialize.Row>
              </div>
            )}
        </Element>

        <Element name="section2">
          <div className="white cardPanel">
            <materialize.Row className="container">
              <materialize.Col className="características" m={4} s={12}>
                <div
                  onPointerEnter={() => addClass(0)}
                  onTouchStart={() => addClass(0)}
                  onPointerLeave={() => removeClass(0)}
                  onTouchEnd={() => removeClass(0)}
                >
                  <Flippy.Flippy
                    style={{ width: "100%", height: "500px" }}
                    flipOnHover={false}
                    flipOnClick={false}
                  >
                    <Flippy.FrontSide
                      style={{ backgroundColor: "rgb(255, 255, 255, 0.6)" }}
                    >
                      <img
                        src="/images/place.png"
                        width="100%"
                        alt="dirección"
                      />

                      <h4 className="center grey-text text-darken-4">
                        ¿Dónde estamos?
                      </h4>
                    </Flippy.FrontSide>
                    <Flippy.BackSide
                      style={{ backgroundColor: "rgb(255, 255, 255, 0.6)" }}
                    >
                      <h4 className="center grey-text text-darken-4">
                        ¿Dónde estamos?
                      </h4>
                      <div className="divider"></div>
                      <h5 className="center">
                        Te esperamos en
                        <span className="companyData">
                          {" " + props.company.address}
                        </span>
                      </h5>
                    </Flippy.BackSide>
                  </Flippy.Flippy>
                </div>
              </materialize.Col>
              <materialize.Col className="características" m={4} s={12}>
                <div
                  onPointerEnter={() => addClass(1)}
                  onTouchStart={() => addClass(1)}
                  onPointerLeave={() => removeClass(1)}
                  onTouchEnd={() => removeClass(1)}
                >
                  <Flippy.Flippy
                    style={{ width: "100%", height: "500px" }}
                    flipOnHover={false}
                    flipOnClick={false}
                  >
                    <Flippy.FrontSide
                      style={{ backgroundColor: "rgb(255, 255, 255, 0.6)" }}
                    >
                      <img src="/images/email.png" alt="email" width="100%" />

                      <h4 className="center grey-text text-darken-4">
                        Contacta con nosotros
                      </h4>
                    </Flippy.FrontSide>
                    <Flippy.BackSide
                      style={{ backgroundColor: "rgb(255, 255, 255, 0.6)" }}
                    >
                      <h4 className="center grey-text text-darken-4">
                        Contacta con nosotros
                      </h4>
                      <div className="divider"></div>
                      <h5 className="center">
                        Si tienes cualquier duda, ponte en contacto con nosotros
                        en
                        <span className="companyData">
                          {" " + props.company.email}
                        </span>
                      </h5>
                    </Flippy.BackSide>
                  </Flippy.Flippy>
                </div>
              </materialize.Col>
              <materialize.Col className="características" m={4} s={12}>
                <div
                  onPointerEnter={() => addClass(2)}
                  onTouchStart={() => addClass(2)}
                  onPointerLeave={() => removeClass(2)}
                  onTouchEnd={() => removeClass(2)}
                >
                  <Flippy.Flippy
                    style={{ width: "100%", height: "500px" }}
                    flipOnHover={false}
                    flipOnClick={false}
                  >
                    <Flippy.FrontSide
                      style={{ backgroundColor: "rgb(255, 255, 255, 0.6" }}
                    >
                      <img
                        src="/images/telephone.png"
                        alt="teléfono"
                        width="100%"
                      />

                      <h4 className="center grey-text text-darken-4">
                        Llámanos
                      </h4>
                    </Flippy.FrontSide>
                    <Flippy.BackSide
                      style={{ backgroundColor: "rgb(255, 255, 255, 0.6)" }}
                    >
                      <h4 className="center grey-text text-darken-4">
                        Llámanos
                      </h4>
                      <div className="divider"></div>
                      <h5 className="center">
                        También puedes llamarnos por teléfono en horario laboral
                        al
                        <span className="companyData">
                          {" " + props.company.telephone}
                        </span>
                      </h5>
                    </Flippy.BackSide>
                  </Flippy.Flippy>
                </div>
              </materialize.Col>
            </materialize.Row>
          </div>
        </Element>
      </div>
      <Footer />
    </div>
  );
};

const mapStateToProps = (state: IGlobalState) => ({
  appointment: state.appointment,
  user: state.user,
  token: state.token,
  company: state.company
});

const mapDispatchToProps = {
  setCompany: actions.setCompany,
  setUser: actions.setUser
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeCompany);
