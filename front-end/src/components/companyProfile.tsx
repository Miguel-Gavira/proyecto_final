import React from "react";
import { Route, Switch, RouteComponentProps } from "react-router-dom";
import Schedule from "./schedule";
import addCompany from "./addCompany";
import { connect } from "react-redux";
import { IGlobalState } from "../reducers/reducers";
import { IUser } from "../IUser";
import datepicker from "./datepicker";
import HomeCompany from "./homeCompany";

interface IProps {}

interface IPropsGlobal {
  user: IUser;
}

const CompanyProfile: React.FC<
  IProps & IPropsGlobal & RouteComponentProps
> = props => {
  return (
    <div className="companyProfile">
      <Switch>
        <Route
          path={"/company/profile/" + props.user.companyId}
          exact
          component={HomeCompany}
        />
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
  );
};

const mapStateToProps = (state: IGlobalState) => ({
  user: state.user
});

export default connect(mapStateToProps)(CompanyProfile);
