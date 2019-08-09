import React from "react";
import Login from "./login";
import Sidenav from "./sidenav";
import { Route, Link } from "react-router-dom";
import { IUser } from "../IUser";
import { IGlobalState } from "../reducers/reducers";
import { connect } from "react-redux";
const materialize = require("react-materialize");

interface IProps {}

interface IPropsGlobal {
  user: IUser;
}

const Navbar: React.FC<IProps & IPropsGlobal> = props => {
  return (
    <div>
      <materialize.Navbar
        className={"grey darken-4"}
        fixed={true}
        brand={
          <a href="#" className="brand-logo">
            Reserva tu cita
          </a>
        }
        alignLinks="right"
        sidenav={<Sidenav />}
      >
        <materialize.NavItem />
        <Link to={"/company/profile/appointment/" + props.user.companyId}>
          <materialize.NavItem>Mis citas</materialize.NavItem>
        </Link>
        <Link to={"/company/profile/info/" + props.user.companyId}>
          <materialize.NavItem>Datos de la empresa</materialize.NavItem>
        </Link>
        <Link to={"/company/profile/schedule/" + props.user.companyId}>
          <materialize.NavItem>Mi horario</materialize.NavItem>
        </Link>
        <materialize.NavItem>
          <Route component={Login} />
        </materialize.NavItem>
      </materialize.Navbar>
    </div>
  );
};

const mapStateToProps = (state: IGlobalState) => ({
  user: state.user
});

export default connect(mapStateToProps)(Navbar);
