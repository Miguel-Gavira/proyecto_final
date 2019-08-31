import React from "react";
import { connect } from "react-redux";
import * as actions from "../actions";
import { IUser } from "../IUser";
import jwt from "jsonwebtoken";
import { RouteComponentProps } from "react-router";

interface IProps {}

interface IPropsGlobal {
  setToken: (token: string) => void;
  setUser: (user: IUser) => void;
}

const AddUser: React.FC<
  IProps & IPropsGlobal & RouteComponentProps
> = props => {
  const [inputUsername, setInputUsername] = React.useState("");
  const [inputPassword, setInputPassword] = React.useState("");
  const [inputEmail, setInputEmail] = React.useState("");

  const updateInputUsername = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputUsername(event.target.value);
  };

  const updateInputPassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputPassword(event.target.value);
  };

  const updateInputEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputEmail(event.target.value);
  };

  const submit = () => {
    fetch("http://localhost:8080/api/user/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: inputUsername,
        password: inputPassword,
        email: inputEmail
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
              companyName: "",
              companyId: ""
            };
            props.setUser(dataUser);
            if(props.location.pathname === "/add"){
              props.history.push("/addCompany");
            }
          }
        });
      }
    });
  };

  return (
    <div>
      <div className="row margin">
        <div className="col s12 m12 l12 center">
          <img
            src="/images/Reserva-tu-cita.png"
            alt="logo"
            className="responsive-img circle"
            width="150px"
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
            required
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
            required
          />
          <label>Password</label>
        </div>
      </div>

      <div className="col m12 l12">
        <div className="input-field">
          <i className="material-icons prefix">email</i>
          <input
            onChange={updateInputEmail}
            value={inputEmail}
            type="email"
            required
          />
          <label>Email</label>
        </div>
      </div>

      <div className="center">
        <button onClick={submit} className="btn waves-effect waves-light ">
          Enviar
        </button>
      </div>
      <br />
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
)(AddUser);
