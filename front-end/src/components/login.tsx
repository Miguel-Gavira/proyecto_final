import React from "react";
import { Route, Switch } from "react-router-dom";
import addUser from "./addUser";
import loginUser from "./loginUser";
import { RouteComponentProps } from "react-router";

const materialize = require("react-materialize");

interface IProps {}

const Login: React.FC<IProps & RouteComponentProps> = props => {
  const changeUrl = () => {
    switch (props.location.pathname) {
      case "/add":
        props.history.push("");
        break;
      case "/":
        props.history.push("/add");
        break;
      default:
    }
  };

  return (
    <div>
      <materialize.Modal
        trigger={<button className="waves-effect waves-light btn">Login</button>}
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
        </Switch>
        <div className="switch center">
          <label>
            Tengo cuenta
            <input
              checked={props.location.pathname === "/add"}
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

export default Login;
