import React from "react";
import Navbar from "./navbar";
import Aside from "./aside";
import { Route, Switch } from "react-router-dom";
import Schedule from "./schedule";

interface IProps {}

const CompanyProfile: React.FC<IProps> = props => {
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
              path="/company/profile/5d4a8a19ea85041e8c91b7dc/schedule"
              component={Schedule}
            />
          </Switch>
        </div>
      </div>
    </div>
  );
};

export default CompanyProfile;
