import React from "react";
import Login from "./login";
import * as actions from "../actions";
import { Route, RouteComponentProps, Link } from "react-router-dom";
import { IUser } from "../IUser";
import { IGlobalState } from "../reducers/reducers";
import { connect } from "react-redux";
import { ICompany } from "../ICompany";
const materialize = require("react-materialize");

interface IProps {}

interface IPropsGlobal {
  token: string;
  user: IUser;
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
    props.setCompany(dataCompany);
    props.setToken("");

    
  }
  return (
    <div>
      <materialize.Navbar
        className={"grey darken-4"}
        fixed={true}
        brand={
          <Link to={"/"} className="brand-logo">
            Reserva tu cita
          </Link>
        }
        alignLinks="right"
      >
        <materialize.NavItem />
        <materialize.NavItem
          onClick={() =>
            props.history.push(
              "/company/profile/appointment/" + props.user.companyId
            )
          }
        >
          Mis citas
        </materialize.NavItem>
        <materialize.NavItem
          onClick={() =>
            props.history.push("/company/profile/info/" + props.user.companyId)
          }
        >
          Datos de la empresa
        </materialize.NavItem>
        <materialize.NavItem
          onClick={() =>
            props.history.push(
              "/company/profile/schedule/" + props.user.companyId
            )
          }
        >
          Mi horario
        </materialize.NavItem>
        <materialize.NavItem >
          {!props.token && <Route component={Login} />}
          {(props.token && props.user.companyId) && "Ir al perfil de mi empresa"}
        </materialize.NavItem>
        {props.token && <materialize.NavItem onClick={logout}>
          <i className="material-icons">exit_to_app</i>
        </materialize.NavItem>}
      </materialize.Navbar>
    </div>
  );
};

const mapStateToProps = (state: IGlobalState) => ({
  user: state.user, token: state.token
});

const mapDispatchToProps = {
  setUser: actions.setUser,
  setCompany: actions.setCompany,
  setToken: actions.setToken
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
