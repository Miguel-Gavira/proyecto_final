import React from "react";
import "./App.css";
import Navbar from "./components/navbar";
import * as actions from "./actions";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Principal from "./components/principal";
import CompanyProfile from "./components/companyProfile";
import { IGlobalState } from "./reducers/reducers";
import { connect } from "react-redux";
import { IUser } from "./IUser";
import jwt from "jsonwebtoken";
import homeCompany from "./components/homeCompany";

interface IPropsGlobal {
  token: string;
  setToken: (token: string) => void;
  setUser: (user: IUser) => void;
}

const App: React.FC<IPropsGlobal> = props => {
  React.useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) {
      const decode = jwt.decode(token);
      if (decode !== null && typeof decode === "object") {
        if (decode.companyId === undefined) {
          const dataUser: IUser = {
            username: decode.username,
            email: decode.email,
            _id: decode._id,
            companyName: "",
            companyId: "",
            appointment: "",
            idAppointment: ""
          };
          props.setUser(dataUser);
          props.setToken(token);
        } else {
          const dataUser: IUser = {
            username: decode.username,
            email: decode.email,
            _id: decode._id,
            companyName: decode.companyName,
            companyId: decode.companyId,
            appointment: "",
            idAppointment: ""
          };
          props.setUser(dataUser);
          props.setToken(token);
        }
      }
    }
  }, []);

  return (
    <BrowserRouter>
      <Route component={Navbar} />
      <Switch>
        <Route path="/company/add/:companyId" exact component={homeCompany} />
        {props.token && (
          <Route path="/company/profile/" component={CompanyProfile} />
        )}
        <Route path="/company/:companyId" exact component={homeCompany} />
        <Route path="/add" exact component={Principal} />
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
