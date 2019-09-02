import React from "react";
import * as actions from "../actions";
import { connect } from "react-redux";
import { IUser } from "../IUser";
import jwt from "jsonwebtoken";
import { RouteComponentProps } from "react-router";

interface IProps {}

interface IPropsGlobal {
  setToken: (token: string) => void;
  setUser: (user: IUser) => void;
}

const LoginUser: React.FC<
  IProps & IPropsGlobal & RouteComponentProps
> = props => {
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
            src="http://localhost:3000/images/Reserva-tu-cita.png"
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

      <div className="center">
        <h3>{errorLogin}</h3>
        <button
          onTouchStart={submit}
          onClick={submit}
          className="btn waves-effect waves-light "
        >
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
)(LoginUser);
