import React, { useState } from "react";
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
  const [error, setError] = useState("");

  const validEmailRegex = new RegExp(
    /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i //eslint-disable-line
  );
  const validateEmail = (e: string) => validEmailRegex.test(e);

  const validUsernameRegex = new RegExp(/^([a-zA-Z0-9' ]+)$/);
  const validateUsername = (e: string) => validUsernameRegex.test(e);

  const mediumRegex = new RegExp(
    "^(((?=.[a-z])(?=.[A-Z]))((?=.[a-z])(?=.[0-9]))((?=.[A-Z])(?=.[0-9])))(?=.{6,})" //eslint-disable-line
  );
  const validatePassword = (p: any) => mediumRegex.test(p);

  const updateInputUsername = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputUsername(event.target.value);
    setError("");
  };

  const updateInputPassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputPassword(event.target.value);
    setError("");
  };

  const updateInputEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputEmail(event.target.value);
    setError("");
  };

  const submit = () => {
    if (inputUsername && inputPassword && inputEmail) {
      if (
        validateEmail(inputEmail) &&
        validateUsername(inputUsername) &&
        validatePassword(inputPassword)
      ) {
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
                props.history.push("/");
              }
            });
          } else {
            response.json().then(e => {
              if (e.code === 11000) {
                setError("El usuario ya exite");
              }
            });
          }
        });
      } else {
        if (!validateEmail(inputEmail)) {
          setError("El email no tiene un formato válido");
        } else if (!validateUsername(inputUsername)) {
          setError("El usuario no tiene un formato válido");
        } else if (!validatePassword(inputPassword)) {
          setError("El password no tiene un formato válido");
        }
      }
    } else {
      setError("Por favor, rellena todos los campos");
    }
  };

  return (
    <div>
      <div className="row margin">
        <div className="col s12 m12 l12 center">
          <img
            src="/images/Reserva-tu-cita.png"
            alt="logo"
            className="responsive-img circle hoverable"
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
            maxLength={20}
            type="text"
            required
          />
          <label>Usuario</label>
          <span className="helper-text">Máx. 15 caracteres</span>
        </div>
      </div>

      <div className="col m12 l12">
        <div className="input-field">
          <i className="material-icons prefix">lock</i>
          <input
            onChange={updateInputPassword}
            value={inputPassword}
            type="password"
            maxLength={20}
            required
          />
          <label>Password</label>
          <span className="helper-text">
            Min. 8 caracteres + mayúscula + minúscula + un número y sin símbolos
          </span>
        </div>
      </div>

      <div className="col m12 l12">
        <div className="input-field">
          <i className="material-icons prefix">email</i>
          <input
            onChange={updateInputEmail}
            value={inputEmail}
            maxLength={20}
            type="email"
            required
          />
          <label>Email</label>
        </div>
      </div>
      <h5 className="red-text center">{error}</h5>
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
