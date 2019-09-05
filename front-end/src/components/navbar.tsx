import React from "react";
import Login from "./login";
import * as actions from "../actions";
import { Route, RouteComponentProps, Link } from "react-router-dom";
import { IUser } from "../IUser";
import { IGlobalState } from "../reducers/reducers";
import { connect } from "react-redux";
import { ICompany } from "../ICompany";
import AddCompany from "./addCompany";
import { scroller } from "react-scroll";

const materialize = require("react-materialize");

interface IProps {}

interface IPropsGlobal {
  token: string;
  user: IUser;
  company: ICompany;
  setUser: (user: IUser) => void;
  setCompany: (company: ICompany) => void;
  setToken: (token: string) => void;
}

const Navbar: React.FC<IProps & IPropsGlobal & RouteComponentProps> = props => {
  const copyPath = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
  };

  const scrollType1 = {
    duration: 500,
    delay: 50,
    smooth: true,
    offset: -80
  };

  const scrollType2 = {
    duration: 500,
    delay: 50,
    smooth: true,
    offset: -50
  };

  const goToSection1 = () => {
    closeSideNav();
    scroller.scrollTo("section1", scrollType1);
  };

  const goToSection2 = () => {
    closeSideNav();
    scroller.scrollTo("section2", scrollType2);
  };

  const logout = () => {
    closeSideNav();
    sessionStorage.clear();
    const dataUser: IUser = {
      username: "",
      email: "",
      _id: "",
      companyName: "",
      companyId: "",
      appointment: "",
      idAppointment: ""
    };
    props.setUser(dataUser);
    props.setToken("");
    if (props.location.pathname !== "/") {
      props.history.push("/company/" + props.company._id);
    }
  };

  const closeSideNav = React.useCallback(() => {
    const a: any = document.getElementsByClassName("sidenav-overlay")[0];
    a.click();
  }, []);

  return (
    <materialize.Navbar
      className={"grey darken-4 myNavbar"}
      fixed={true}
      brand={
        props.company.companyName && props.location.pathname !== "/" ? (
          <Link to={"/company/" + props.company._id}>
            {props.company.companyName}
          </Link>
        ) : (
          <Link to={"/"} className="brand-logo">
            Reserva tu cita
          </Link>
        )
      }
      alignLinks="right"
    >
      <materialize.NavItem />
      {(props.user._id !== props.company.owner || !props.user._id) &&
        (props.location.pathname === "/" ||
          props.location.pathname === "/add" ||
          props.location.pathname === "/company/" + props.company._id ||
          props.location.pathname === "/company/add/" + props.company._id) && (
          <materialize.NavItem onClick={goToSection1}>
            <materialize.Button className="btn-flat white-text waves-effect waves-light ">
              {props.user.appointment && props.user._id !== props.company.owner
                ? "Tienes una cita reservada"
                : "¿Cómo funciona?"}
            </materialize.Button>
          </materialize.NavItem>
        )}
      {(props.user._id !== props.company.owner || !props.user._id) &&
        (props.location.pathname === "/" ||
          props.location.pathname === "/add" ||
          props.location.pathname === "/company/" + props.company._id ||
          props.location.pathname === "/company/add/" + props.company._id) && (
          <materialize.NavItem onClick={goToSection2}>
            <materialize.Button className="btn-flat white-text waves-effect waves-light ">
              {(props.location.pathname === "/" ||
                props.location.pathname === "/add") &&
              !props.token
                ? "Características"
                : "Sobre nosotros"}
            </materialize.Button>
          </materialize.NavItem>
        )}
      {!props.token && (
        <materialize.NavItem onClick={closeSideNav}>
          <Route component={Login} />
        </materialize.NavItem>
      )}
      {props.token &&
        props.user.companyId === props.company._id &&
        props.location.pathname !== "/" &&
        props.location.pathname !== "/add" && (
          <materialize.NavItem onClick={closeSideNav}>
            <materialize.Button
              className="btn-flat white-text waves-effect waves-light "
              onClick={() =>
                props.history.push(
                  "/company/profile/info/" + props.user.companyId
                )
              }
            >
              Modificar datos
            </materialize.Button>
          </materialize.NavItem>
        )}
      {props.token &&
        props.user.companyId === props.company._id &&
        props.location.pathname !== "/" &&
        props.location.pathname !== "/add" && (
          <materialize.NavItem onClick={closeSideNav}>
            <materialize.Button
              className="btn-flat white-text waves-effect waves-light "
              onClick={() =>
                props.history.push(
                  "/company/profile/schedule/" + props.user.companyId
                )
              }
            >
              Modificar horario
            </materialize.Button>
          </materialize.NavItem>
        )}
      {((props.token &&
        props.location.pathname !== "/" &&
        props.location.pathname !== "/add" &&
        props.user.appointment === "") ||
        (props.user.companyId === props.company._id &&
          props.user.companyId &&
          props.token)) && (
        <materialize.NavItem onClick={closeSideNav}>
          <materialize.Button
            className="btn-flat white-text waves-effect waves-light "
            onClick={() =>
              props.history.push(
                "/company/profile/appointment/" + props.user.companyId
              )
            }
          >
            Reservar cita
          </materialize.Button>
        </materialize.NavItem>
      )}
      {props.token && props.user.companyId && props.location.pathname === "/" && (
        <materialize.NavItem onClick={closeSideNav}>
          <materialize.Button
            className="btn-flat white-text waves-effect waves-light "
            onClick={() =>
              props.history.push("/company/" + props.user.companyId)
            }
          >
            Ir a mi empresa
          </materialize.Button>
        </materialize.NavItem>
      )}
      {!props.company._id && !props.user.companyId && props.token && (
        <materialize.NavItem onClick={closeSideNav}>
          <materialize.Modal
            options={{ inDuration: 1000, outDuration: 1000 }}
            className="newCompany"
            bottomSheet
            fixedFooter={true}
            trigger={
              <materialize.Button className="waves-effect waves-light btn-flat white-text open">
                Crear empresa
              </materialize.Button>
            }
            actions={
              <materialize.Button
                className="red waves-effect waves-light btn"
                modal="close"
              >
                Cerrar
              </materialize.Button>
            }
          >
            <Route path="/" exact component={AddCompany} />
          </materialize.Modal>
        </materialize.NavItem>
      )}
      {props.token &&
        props.user.companyId === props.company._id &&
        props.location.pathname !== "/" &&
        props.location.pathname !== "/add" &&
        props.location.pathname !==
          "/company/profile/info/" + props.company._id &&
        props.location.pathname !==
          "/company/profile/schedule/" + props.company._id &&
        props.location.pathname !==
          "/company/profile/appointment/" + props.company._id && (
          <materialize.NavItem onClick={closeSideNav}>
            <materialize.Button
              className="btn-flat white-text"
              onClick={copyPath}
              tooltip="Dale esta URL a tus clientes para que reserven las citas en tu empresa"
            >
              Copiar mi enlace
            </materialize.Button>
          </materialize.NavItem>
        )}
      {props.token && (
        <materialize.NavItem className="btn-floating" onClick={logout}>
          <i className="material-icons">exit_to_app</i>
        </materialize.NavItem>
      )}
    </materialize.Navbar>
  );
};

const mapStateToProps = (state: IGlobalState) => ({
  user: state.user,
  token: state.token,
  company: state.company
});

const mapDispatchToProps = {
  setUser: actions.setUser,
  setCompany: actions.setCompany,
  setToken: actions.setToken
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Navbar);
