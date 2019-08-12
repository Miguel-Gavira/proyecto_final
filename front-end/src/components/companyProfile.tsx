import React from "react";
import Navbar from "./navbar";
import Aside from "./aside";
import { Route, Switch } from "react-router-dom";
import Schedule from "./schedule";
import addCompany from "./addCompany";
import { connect } from "react-redux";
import { IGlobalState } from "../reducers/reducers";
import { IUser } from "../IUser";
import datepicker from "./datepicker";
import { Link } from "react-router-dom";
const materialize = require("react-materialize");

interface IProps {}

interface IPropsGlobal {
  user: IUser;
}

const CompanyProfile: React.FC<IProps & IPropsGlobal> = props => {
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
              image: "static/media/react-materialize-logo.824c6ea3.svg",
              name: "John Doe"
            }}
          />
          <materialize.SideNavItem icon="cloud">
            <Link to={"/company/profile/appointment/" + props.user.companyId}>
              <li className="collection-item">Mis citas</li>
            </Link>
          </materialize.SideNavItem>
          <materialize.SideNavItem href="#!second">
            <Link to={"/company/profile/info/" + props.user.companyId}>
              <li className="collection-item">Datos de la empresa</li>
            </Link>
          </materialize.SideNavItem>
          <materialize.SideNavItem divider />
          <materialize.SideNavItem subheader>Subheader</materialize.SideNavItem>
          <materialize.SideNavItem waves href="#!third">
            <Link to={"/company/profile/schedule/" + props.user.companyId}>
              <li className="collection-item">Mi horario</li>
            </Link>
          </materialize.SideNavItem>
        </materialize.SideNav>
      </div>
      <div>
        <Switch>
          <Route
            path={"/company/profile/appointment/" + props.user.companyId}
            component={datepicker}
          />
          <Route
            path={"/company/profile/info/" + props.user.companyId}
            component={addCompany}
          />
          <Route
            path={"/company/profile/schedule/" + props.user.companyId}
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
