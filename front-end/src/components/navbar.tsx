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
    const url = props.location.pathname;
    navigator.clipboard.writeText("http://localhost:3000" + url);
  };

  const scrollType = {
    duration: 500,
    delay: 50,
    smooth: true,
    offset: -80
  };

  const goToSection1 = () => {
    scroller.scrollTo("section1", scrollType);
  };

  const goToSection2 = () => {
    scroller.scrollTo("section2", scrollType);
  };

  const logout = () => {
    sessionStorage.clear();
    const dataUser: IUser = {
      username: "",
      email: "",
      _id: "",
      companyName: "",
      companyId: ""
    };
    props.setUser(dataUser);
    props.setToken("");
  };

  return (
    <div>
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

        {(props.location.pathname === "/" ||
          props.location.pathname === "/add") && (
          <materialize.NavItem onClick={goToSection1}>
            ¿Cómo funciona?
          </materialize.NavItem>
        )}
        {(props.location.pathname === "/" ||
          props.location.pathname === "/add") && (
          <materialize.NavItem onClick={goToSection2}>
            Características
          </materialize.NavItem>
        )}
        {!props.token && (
          <materialize.NavItem>
            <Route component={Login} />
          </materialize.NavItem>
        )}
        {props.token &&
          props.user.companyId === props.company._id &&
          props.location.pathname !== "/" && (
            <materialize.NavItem
              onClick={() =>
                props.history.push(
                  "/company/profile/appointment/" + props.user.companyId
                )
              }
            >
              Reservar una cita
            </materialize.NavItem>
          )}
        {props.token &&
          props.user.companyId === props.company._id &&
          props.location.pathname !== "/" && (
            <materialize.NavItem
              onClick={() =>
                props.history.push(
                  "/company/profile/info/" + props.user.companyId
                )
              }
            >
              Datos de la empresa
            </materialize.NavItem>
          )}
        {props.token &&
          props.user.companyId === props.company._id &&
          props.location.pathname !== "/" && (
            <materialize.NavItem
              onClick={() =>
                props.history.push(
                  "/company/profile/schedule/" + props.user.companyId
                )
              }
            >
              Mi horario
            </materialize.NavItem>
          )}
        {props.token &&
          props.user.companyId &&
          props.location.pathname === "/" && (
            <materialize.NavItem
              className="waves-effect waves-light btn"
              onClick={() =>
                props.history.push("/company/" + props.user.companyId)
              }
            >
              Ir a mi empresa
            </materialize.NavItem>
          )}
        {!props.company._id && !props.user.companyId && props.token && (
          <materialize.NavItem>
            <materialize.Modal
              options={{ inDuration: 1000, outDuration: 1000 }}
              className="newCompany"
              bottomSheet
              fixedFooter={true}
              trigger={
                <button className="waves-effect waves-light btn open">
                  Crear empresa
                </button>
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
           props.user.companyId === props.company._id  &&
          props.location.pathname !== "/" && (
            <materialize.NavItem>
              <button className="btn" onClick={copyPath}>
                  Copiar mi enlace
              </button>
            </materialize.NavItem>
          )}
        {props.token && (
          <materialize.NavItem onClick={logout}>
            <i className="material-icons">exit_to_app</i>
          </materialize.NavItem>
        )}
      </materialize.Navbar>
    </div>
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
