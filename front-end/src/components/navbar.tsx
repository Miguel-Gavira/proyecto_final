import React from "react";
import Login from "./login";
import Sidenav from "./sidenav";
import { Route, RouteComponentProps, Link } from "react-router-dom";
import { IUser } from "../IUser";
import { IGlobalState } from "../reducers/reducers";
import { connect } from "react-redux";
const materialize = require("react-materialize");

interface IProps {}

interface IPropsGlobal {
  user: IUser;
}

const Navbar: React.FC<IProps & IPropsGlobal & RouteComponentProps> = props => {
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
        sidenav={<Sidenav />}
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
