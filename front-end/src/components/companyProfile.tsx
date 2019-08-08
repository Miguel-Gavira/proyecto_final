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

interface IProps {}

interface IPropsGlobal {
  user: IUser;
}

const CompanyProfile: React.FC<IProps & IPropsGlobal> = props => {
  return (
    <div>
      <Navbar />
      <div className="row">
        <div className="sidenav-main nav-expanded nav-lock nav-collapsible sidenav-light sidenav-active-square col s3">
          <Aside />
        </div>
        <div className="col s9">
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
    </div>
  );
};

const mapStateToProps = (state: IGlobalState) => ({
  user: state.user
});

export default connect(mapStateToProps)(CompanyProfile);
