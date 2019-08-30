import React from "react";
import { Route, Switch } from "react-router-dom";
import addUser from "./addUser";
import loginUser from "./loginUser";
import { RouteComponentProps } from "react-router";
import { ICompany } from "../ICompany";
import { IGlobalState } from "../reducers/reducers";
import { connect } from "react-redux";

const materialize = require("react-materialize");

interface IProps {}

interface IPropsGlobal {
  company: ICompany;
}

const Login: React.FC<IProps & IPropsGlobal & RouteComponentProps> = props => {
  const changeUrl = () => {
    switch (props.location.pathname) {
      case "/add":
        props.history.push("");
        break;
      case "/":
        props.history.push("/add");
        break;
      case "/company/" + props.company._id:
        props.history.push("/company/add/" + props.company._id);
        break;
      case "/company/add/" + props.company._id:
        props.history.push("/company/" + props.company._id);
        break;
      default:
    }
  };

  return (
    <div>
      <materialize.Modal
        trigger={
          <button className="waves-effect waves-light btn">
            Login
          </button>
        }
        className="LoginCard"
        options={{ closeOnClick: false, constrainWidth: false }}
        actions={
          <materialize.Button waves="green" modal="close" flat>
            Cerrar
          </materialize.Button>
        }
      >
        <Switch>
          <Route path="/" exact component={loginUser} />
          <Route path="/add" exact component={addUser} />
          <Route
            path={"/company/" + props.company._id}
            exact
            component={loginUser}
          />
          <Route
            path={"/company/add/" + props.company._id}
            exact
            component={addUser}
          />
        </Switch>
        <div className="switch center">
          <label>
            Tengo cuenta
            <input
              checked={
                props.location.pathname === "/add" ||
                props.location.pathname === "/company/add/" + props.company._id
              }
              type="checkbox"
              onChange={changeUrl}
            />
            <span className="lever" />
            Soy nuevo
          </label>
        </div>
      </materialize.Modal>
    </div>
  );
};

const mapStateToProps = (state: IGlobalState) => ({
  company: state.company
});

export default connect(mapStateToProps)(Login);
