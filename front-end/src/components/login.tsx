import React from "react";
import { Route, Switch } from "react-router-dom";
import addUser from "./addUser";
import loginUser from "./loginUser";

const materialize = require("react-materialize");

interface IProps {}

const Login: React.FC<IProps> = props => {

  return (
    <div>
      <materialize.Modal
        trigger={<a className="waves-effect waves-light btn">Login</a>}
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
      </materialize.Modal>
    </div>
  );
};


export default Login;
