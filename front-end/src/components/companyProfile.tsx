import React from "react";
import { Route, Switch, RouteComponentProps, Redirect } from "react-router-dom";
import Schedule from "./schedule";
import addCompany from "./addCompany";
import { connect } from "react-redux";
import { IGlobalState } from "../reducers/reducers";
import { IUser } from "../IUser";
import datepicker from "./datepicker";
import Navbar from "./navbar";
const materialize = require("react-materialize");

interface IProps {}

interface IPropsGlobal {
  user: IUser;
}

const CompanyProfile: React.FC<
  IProps & IPropsGlobal & RouteComponentProps
> = props => {
  const closeNavAppointment = () => {
    const aux: any = document.getElementsByClassName("sidenav-overlay")[0];
    aux.click();
    props.history.push("/company/profile/appointment/" + props.user.companyId);
  };

  const closeNavDataCompany = () => {
    const aux: any = document.getElementsByClassName("sidenav-overlay")[0];
    aux.click();
    props.history.push("/company/profile/info/" + props.user.companyId);
  };

  const closeNavSchedule = () => {
    const aux: any = document.getElementsByClassName("sidenav-overlay")[0];
    aux.click();
    props.history.push("/company/profile/schedule/" + props.user.companyId);
  };

  return (
    <div className="companyProfile">
        <Route component={Navbar} />
      {/* <div className="sidenavCompany">
        <materialize.SideNav
          trigger={<button className="btn sidenavButton">Menú</button>}
          options={{ closeOnClick: true, draggable: true }}
        >
          <materialize.SideNavItem className="collection-header" href={null}>
            {props.user.companyName}
          </materialize.SideNavItem>
          <materialize.SideNavItem
            className="collection-item"
            onClick={closeNavAppointment}
            href={null}
            waves
            icon="event_available"
          >
            Mis citas
          </materialize.SideNavItem>
          <materialize.SideNavItem
            className="collection-item"
            onClick={closeNavDataCompany}
            href={null}
            waves
            icon="edit"
          >
            Datos de la empresa
          </materialize.SideNavItem>
          <materialize.SideNavItem
            onClick={closeNavSchedule}
            className="collection-item"
            href={null}
            waves
            icon="alarm_on"
          >
            Mi horario
          </materialize.SideNavItem>
        </materialize.SideNav>
      </div> */}
      <div>
        <Switch>
          <Route
            path={"/company/profile/appointment/" + props.user.companyId}
            exact
            component={datepicker}
          />
          <Route
            path={"/company/profile/info/" + props.user.companyId}
            exact
            component={addCompany}
          />
          <Route
            path={"/company/profile/schedule/" + props.user.companyId}
            exact
            component={Schedule}
          />
        </Switch>
      </div>
    </div>
  );
};

const mapStateToProps = (state: IGlobalState) => ({
  user: state.user
});

export default connect(mapStateToProps)(CompanyProfile);
