import React from "react";
import Login from "./login";
import * as actions from "../actions";
import { Route, RouteComponentProps, Link } from "react-router-dom";
import { IUser } from "../IUser";
import { IGlobalState } from "../reducers/reducers";
import { connect } from "react-redux";
import { ICompany } from "../ICompany";
import AddCompany from "./addCompany";

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
  const logout = () => {
    sessionStorage.clear();
    const dataUser: IUser = {
      username: "",
      email: "",
      _id: "",
      companyName: "",
      companyId: ""
    };
    const dataCompany: ICompany = {
      _id: "",
      companyName: "",
      owner: "",
      address: "",
      telephone: 0,
      type: "",
      email: "",
      appointmentDuration: 0,
      schedule: [
        {
          _id: "",
          weekday: "",
          startTime: "",
          finishTime: ""
        }
      ]
    };
    props.setUser(dataUser);
    props.setToken("");
  };

  React.useEffect(() => {
    if (props.token && !props.user.companyId) {
      const aux: any = document.getElementsByClassName("open")[0];
      aux.click();
    }
  }, [props.token, props.user]);

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
        {!props.company._id && !props.user.companyId && props.token && (
          <materialize.NavItem>
            <materialize.Modal
              options={{ inDuration: 1000, outDuration: 1000 }}
              className="newCompany"
              bottomSheet
              fixedFooter={true}
              trigger={
                <button className="waves-effect waves-light btn open cyan darken-1">
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
          props.user.companyId &&
          props.location.pathname !== "/" && (
            <materialize.NavItem
              onClick={() =>
                props.history.push(
                  "/company/profile/appointment/" + props.user.companyId
                )
              }
            >
              Mis citas
            </materialize.NavItem>
          )}
        {props.token &&
          props.user.companyId &&
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
          props.user.companyId &&
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
              className="waves-effect waves-light btn cyan darken-1"
              onClick={() =>
                props.history.push("/company/" + props.user.companyId)
              }
            >
              Ir a mi empresa
            </materialize.NavItem>
          )}

        {!props.token && (
          <materialize.NavItem>
            <Route component={Login} />
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
