import React from "react";
import "./App.css";
import Landing from "./components/landing";
import * as actions from "./actions";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Principal from "./components/principal";
import CompanyProfile from "./components/companyProfile";
import { IGlobalState } from "./reducers/reducers";
import { connect } from "react-redux";
import { IUser } from "./IUser";
import jwt from "jsonwebtoken";

interface IPropsGlobal {
  token: string;
  setToken: (token: string) => void;
  setUser: (user: IUser) => void;
}

const App: React.FC<IPropsGlobal> = props => {
  React.useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) {
      props.setToken(token);
      const decode = jwt.decode(token);
      if (decode !== null && typeof decode === "object") {
        if (decode.companyId === undefined) {
          const dataUser = {
            username: decode.username,
            email: decode.email,
            _id: decode._id,
            companyName: "",
            companyId: ""
          };
          props.setUser(dataUser);
        } else {
          const dataUser = {
            username: decode.username,
            email: decode.email,
            _id: decode._id,
            companyName: decode.companyName,
            companyId: decode.companyId
          };
          props.setUser(dataUser);
        }
      }
    }
  }, []);

  return (
    <BrowserRouter>
      <Switch>
        {props.token && (
          <Route path="/company/profile/" component={CompanyProfile} />
        )}
        <Route path="/company/:companyId" exact component={Landing} />
        <Route path="/" exact component={Principal} />
        <Redirect to="/" />
      </Switch>
    </BrowserRouter>
  );
};

const mapStateToProps = (state: IGlobalState) => ({
  token: state.token
});

const mapDispatchToProps = {
  setToken: actions.setToken,
  setUser: actions.setUser
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
