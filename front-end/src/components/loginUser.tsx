import React from "react";
import * as actions from "../actions";
import { connect } from "react-redux";
import { IUser } from "../IUser";
import jwt from "jsonwebtoken";
import { Link, Route, Switch } from "react-router-dom";
import addUser from "./addUser";

const materialize = require("react-materialize");

interface IProps {}

interface IPropsGlobal {
  setToken: (token: string) => void;
  setUser: (user: IUser) => void;
}

const LoginUser: React.FC<IProps & IPropsGlobal> = props => {
  const [inputUsername, setInputUsername] = React.useState("");
  const [inputPassword, setInputPassword] = React.useState("");
  const [errorLogin, setErrorLogin] = React.useState("");

  const updateInputUsername = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputUsername(event.target.value);
  };

  const updateInputPassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputPassword(event.target.value);
  };

  const submit = () => {
    fetch("http://localhost:8080/api/auth/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: inputUsername,
        password: inputPassword
      })
    }).then(response => {
      if (response.ok) {
        response.text().then(token => {
          sessionStorage.setItem("token", token);
          props.setToken(token);
          const decode = jwt.decode(token);
          if (decode !== null && typeof decode !== "string") {
            const dataUser = {
              username: decode.username,
              email: decode.email,
              _id: decode._id,
              companyName: decode.companyName,
              companyId: decode.companyId
            };
            props.setUser(dataUser);
          }
        });
      } else {
        setErrorLogin("Usuario o contraseña incorrecta");
      }
    });
  };

  return (
    <div>
        <div className="row margin">
          <div className="col s12 m12 l12 center">
            <img
              src="https://png.pngtree.com/svg/20161113/ef1b24279e.png"
              alt="logo"
              className="responsive-img circle"
              width="100px"
            />
          </div>
        </div>

        <div className="col s12 m12 l12">
          <div className="input-field">
            <i className="material-icons prefix">person</i>
            <input
              onChange={updateInputUsername}
              value={inputUsername}
              type="text"
              name="username"
              id="username"
            />
            <label>Username</label>
          </div>
        </div>

        <div className="col m12 l12">
          <div className="input-field">
            <i className="material-icons prefix">lock</i>
            <input
              onChange={updateInputPassword}
              value={inputPassword}
              type="password"
              name="password"
              id="password"
            />
            <label>Password</label>
          </div>
        </div>

        <div className="center">
          <h3>{errorLogin}</h3>
          <button onClick={submit} className="btn waves-effect waves-light ">
            Enviar
          </button>
        </div>
        <br/> 
        <div className="switch center">
          <label>
            Tengo cuenta
            <Link to="/add"><input type="checkbox" /></Link>
            <span className="lever" />
            Soy nuevo
          </label>
        </div>
    </div>
  );
};

const mapDispatchToProps = {
  setToken: actions.setToken,
  setUser: actions.setUser
};

export default connect(
  null,
  mapDispatchToProps
)(LoginUser);
