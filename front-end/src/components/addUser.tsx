import React, { useState } from "react";
import { connect } from "react-redux";
import * as actions from "../actions";
import { IUser } from "../IUser";
import jwt from "jsonwebtoken";
import { RouteComponentProps } from "react-router";
import { ICompany } from "../ICompany";
import { IGlobalState } from "../reducers/reducers";

interface IProps {}

interface IPropsGlobal {
  company: ICompany;
  setToken: (token: string) => void;
  setUser: (user: IUser) => void;
}

//Este componente añade a los usuarios
const AddUser: React.FC<
  IProps & IPropsGlobal & RouteComponentProps
> = props => {
  const [inputUsername, setInputUsername] = React.useState("");
  const [inputPassword, setInputPassword] = React.useState("");
  const [inputEmail, setInputEmail] = React.useState("");
  const [error, setError] = useState("");

  //Función para validar que el email tenga un formato lógico
  const validEmailRegex = new RegExp(
    /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i //eslint-disable-line
  );
  const validateEmail = (e: string) => validEmailRegex.test(e);

  //Función para validar que el nombre tenga un formato sin símbolos
  const validUsernameRegex = new RegExp(/^([a-zA-ZÁ-ÿ0-9' ]+)$/);
  const validateUsername = (e: string) => validUsernameRegex.test(e);

  //Función para validar que la contraseña tenga más de 8 caracteres
  //al menos una mayúscul, una minúscula y un número
  const mediumRegex = new RegExp(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/ //eslint-disable-line
  );
  const validatePassword = (p: any) => mediumRegex.test(p);

  //Control del input del nombre de usuario
  const updateInputUsername = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputUsername(event.target.value);
    setError("");
  };

  //Control del input del password
  const updateInputPassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputPassword(event.target.value);
    setError("");
  };

  //Control del input del email
  const updateInputEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputEmail(event.target.value);
    setError("");
  };

  //Función para enviar los datos del formulario al back
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
                if (props.location.pathname === "/add") {
                  props.history.push("/");
                } else if (
                  props.location.pathname ===
                  "/company/add/" + props.company._id
                ) {
                  props.history.push("/company/" + props.company._id);
                }
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
      }
      //Validación de errores y mensaje para el usuario
      else {
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
            maxLength={15}
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
            maxLength={30}
            required
          />
          <label>Password</label>
          <span className="helper-text">
            Min. 8 caracteres + mayúscula + minúscula + un número
          </span>
        </div>
      </div>

      <div className="col m12 l12">
        <div className="input-field">
          <i className="material-icons prefix">email</i>
          <input
            onChange={updateInputEmail}
            value={inputEmail}
            maxLength={30}
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

const mapStateToProps = (state: IGlobalState) => ({
  company: state.company
});

const mapDispatchToProps = {
  setToken: actions.setToken,
  setUser: actions.setUser
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddUser);
