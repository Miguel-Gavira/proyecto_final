import React from "react";
import { Route, Switch, RouteComponentProps, Redirect } from 'react-router-dom';
import Schedule from "./schedule";
import addCompany from "./addCompany";
import { connect } from "react-redux";
import { IGlobalState } from "../reducers/reducers";
import { IUser } from "../IUser";
import datepicker from "./datepicker";
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
    <div>
      <div className="sidenavCompany">
        <materialize.SideNav
          trigger={<button className="btn sidenavButton">Menú</button>}
          options={{ closeOnClick: true }}
        >
          <materialize.SideNavItem
            userView
            user={{
              background: "https://placeimg.com/640/480/tech",
              image: "https://png.pngtree.com/svg/20161113/ef1b24279e.png",
              name: props.user.companyName
            }}
            href={null}
          />
          <materialize.SideNavItem href={null} waves icon="cloud">
            <p onClick={closeNavAppointment} className="collection-item">
              Mis citas
            </p>
          </materialize.SideNavItem>
          <materialize.SideNavItem href={null} waves icon="cloud">
            <p onClick={closeNavDataCompany} className="collection-item">
              Datos de la empresa
            </p>
          </materialize.SideNavItem>
          <materialize.SideNavItem href={null} waves icon="cloud">
            <p onClick={closeNavSchedule} className="collection-item">
              Mi horario
            </p>
          </materialize.SideNavItem>
        </materialize.SideNav>
      </div>
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
