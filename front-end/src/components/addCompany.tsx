import React, { useState } from "react";
import { IGlobalState } from "../reducers/reducers";
import { connect } from "react-redux";
import { IUser } from "../IUser";
import { ICompany } from "../ICompany";
import * as actions from "../actions";
import { RouteComponentProps } from "react-router";
const materialize = require("react-materialize");

interface IProps {}

interface IPropsGlobal {
  token: string;
  company: ICompany;
  user: IUser;
  setUser: (user: IUser) => void;
  setCompany: (company: ICompany) => void;
}

const AddCompany: React.FC<
  IProps & IPropsGlobal & RouteComponentProps
> = props => {
  const [inputCompanyName, setInputCompanyName] = React.useState("");
  const [inputAddress, setInputAddress] = React.useState("");
  const [inputTelephone, setInputTelephone] = React.useState("");
  const [inputType, setInputType] = React.useState("");
  const [inputEmail, setInputEmail] = React.useState("");
  const [
    inputAppointmentDuration,
    setInputAppointmentDuration
  ] = React.useState("0");
  const [editMode, setEditMode] = React.useState(false);
  const [error, setError] = useState("");

  const updateEditMode = () => {
    setEditMode(e => !e);
    setError("");
  };

  const updateInputCompanyName = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setInputCompanyName(event.target.value);
    setError("");
  };

  const updateInputAddress = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputAddress(event.target.value);
    setError("");
  };

  const updateInputTelephone = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputTelephone(event.target.value);
    setError("");
  };

  const updateInputType = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputType(event.target.value);
    setError("");
  };

  const updateInputEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputEmail(event.target.value);
    setError("");
  };

  const updateInputAppointmentDuration = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setInputAppointmentDuration(event.target.value);
    setError("");
  };

  const validEmailRegex = new RegExp(
    /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i //eslint-disable-line
  );
  const validateEmail = (e: string) => validEmailRegex.test(e);

  const validComanyNameRegex = new RegExp(/^([a-zA-Z0-9' ]+)$/);
  const validateCompanyName = (e: string) => validComanyNameRegex.test(e);

  const submit = () => {
    if (
      inputCompanyName &&
      inputAddress &&
      inputAppointmentDuration !== "0" &&
      inputEmail &&
      inputTelephone &&
      inputType
    ) {
      if (validateEmail(inputEmail) && validateCompanyName(inputCompanyName)) {
        if (!props.user.companyId) {
          fetch("http://localhost:8080/api/company/add/" + props.user._id, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + props.token
            },
            body: JSON.stringify({
              companyName: inputCompanyName,
              address: inputAddress,
              telephone: +inputTelephone,
              type: inputType,
              email: inputEmail,
              appointmentDuration: +inputAppointmentDuration
            })
          }).then(response => {
            if (response.ok) {
              response.json().then(d => {
                const dataCompany: ICompany = {
                  _id: d._id,
                  companyName: d.companyName,
                  owner: d.owner,
                  address: d.address,
                  telephone: d.telephone,
                  type: d.type,
                  email: d.email,
                  appointmentDuration: d.appointmentDuration
                };
                const dataUser: IUser = {
                  ...props.user,
                  companyName: d.companyName,
                  companyId: d._id,
                  appointment: "",
                  idAppointment: ""
                };
                props.setUser(dataUser);
                props.setCompany(dataCompany);
                if (window.location.pathname === "/") {
                  console.log(props.user.companyId);
                  props.history.push("/company/" + d._id);
                }
              });
            } else {
              response.json().then(e => {
                if (e.code === 11000) {
                  setError("La empresa ya exite");
                }
              });
            }
          });
        } else {
          fetch(
            "http://localhost:8080/api/company/edit/" +
              props.user.companyId +
              "/" +
              props.company.owner,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + props.token
              },
              body: JSON.stringify({
                companyName: inputCompanyName,
                address: inputAddress,
                telephone: +inputTelephone,
                type: inputType,
                email: inputEmail,
                appointmentDuration: +inputAppointmentDuration
              })
            }
          )
            .then(response => {
              if (response.ok) {
                updateEditMode();
              } else {
                response.json().then(e => {
                  if (e.code === 11000) {
                    setError("La empresa ya exite");
                  }
                });
              }
            })
            .catch(error => {
              console.log(error);
            });
        }
      } else {
        if (!validateEmail(inputEmail)) {
          setError("El email no tiene un formato válido");
        } else if (!validateCompanyName(inputCompanyName)) {
          setError(
            "El nombre de la empresa sólo puede contener letras y números"
          );
        }
      }
    } else {
      setError("Por favor, rellena todos los campos");
    }
  };

  React.useEffect(() => {
    if (props.user.companyId) {
      fetch("http://localhost:8080/api/company/" + props.user.companyId, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      }).then(response => {
        if (response.ok) {
          response.json().then(documents => {
            setInputCompanyName(documents.companyName);
            setInputAddress(documents.address);
            setInputTelephone(documents.telephone);
            setInputType(documents.type);
            setInputEmail(documents.email);
            setInputAppointmentDuration(documents.appointmentDuration);
            const dataCompany: ICompany = {
              _id: documents._id,
              companyName: documents.companyName,
              owner: documents.owner,
              address: documents.address,
              telephone: documents.telephone,
              type: documents.type,
              email: documents.email,
              appointmentDuration: documents.appointmentDuration
            };
            props.setCompany(dataCompany);
          });
        }
      });
    } // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.user, editMode]);

  return (
    <div
      className={
        props.location.pathname === "/" ? "addCompany" : "SignInCompanies"
      }
    >
      <div className="formCompany hoverable">
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
              onChange={updateInputCompanyName}
              value={inputCompanyName}
              type="text"
              maxLength={15}
              disabled={
                Boolean(inputCompanyName) &&
                !editMode &&
                window.location.pathname !== "/"
              }
              required
            />
            <label className={inputCompanyName && " active"}>
              Nombre de la empresa
            </label>
          </div>
        </div>

        <div className="col m12 l12">
          <div className="input-field">
            <i className="material-icons prefix">location_on</i>
            <input
              onChange={updateInputAddress}
              value={inputAddress}
              type="text"
              disabled={
                Boolean(inputAddress) &&
                !editMode &&
                window.location.pathname !== "/"
              }
              required
            />
            <label className={inputAddress && " active"}>Dirección</label>
          </div>
        </div>

        <div className="col m12 l12">
          <div className="input-field">
            <i className="material-icons prefix">local_phone</i>
            <input
              onChange={updateInputTelephone}
              value={inputTelephone}
              type="number"
              disabled={
                Boolean(inputTelephone) &&
                !editMode &&
                window.location.pathname !== "/"
              }
              required
            />
            <label className={inputTelephone && " active"}>Telefono</label>
          </div>
        </div>

        <div className="col m12 l12">
          <div className="input-field">
            <i className="material-icons prefix">shopping_basket</i>
            <input
              onChange={updateInputType}
              value={inputType}
              type="text"
              disabled={
                Boolean(inputType) &&
                !editMode &&
                window.location.pathname !== "/"
              }
              required
            />
            <label className={inputType && " active"}>Sector</label>
          </div>
        </div>

        <div className="col m12 l12">
          <div className="input-field">
            <i className="material-icons prefix">email</i>
            <input
              onChange={updateInputEmail}
              value={inputEmail}
              type="text"
              disabled={
                Boolean(inputEmail) &&
                !editMode &&
                window.location.pathname !== "/"
              }
              required
            />
            <label className={inputEmail && " active"}>Email</label>
          </div>
        </div>

        <div className="col m12 l12">
          <div className="input-field black-text">
            <i className="material-icons prefix">alarm</i>
            <input
              value={inputAppointmentDuration + " minutos"}
              readOnly
              type="text"
              disabled={
                Boolean(inputAppointmentDuration) &&
                !editMode &&
                window.location.pathname !== "/"
              }
              required
            />
            <label className="active">Duración de una cita</label>
            {(editMode || window.location.pathname === "/") && (
              <span className="helper-text">
                Usa la barra para modificar la duración
              </span>
            )}
          </div>
          <div>
            <materialize.Range
              min="5"
              max="120"
              step="5"
              name="points"
              onChange={updateInputAppointmentDuration}
              value={inputAppointmentDuration}
              disabled={
                Boolean(inputAppointmentDuration) &&
                !editMode &&
                window.location.pathname !== "/"
              }
            />
          </div>
        </div>
        <h4>{error}</h4>
        {(editMode || window.location.pathname === "/") && (
          <div className="center">
            <button onClick={submit} className="btn waves-effect waves-light">
              Enviar
            </button>
          </div>
        )}

        {editMode && window.location.pathname !== "/" && (
          <div className="center">
            <br />
            <button
              onClick={updateEditMode}
              className="btn red waves-effect waves-light"
            >
              Cancelar
            </button>
          </div>
        )}

        {!editMode && window.location.pathname !== "/" && (
          <div className="center">
            <button
              onClick={updateEditMode}
              className="btn waves-effect waves-light"
            >
              Editar
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state: IGlobalState) => ({
  user: state.user,
  token: state.token,
  company: state.company
});

const mapDispatchToProps = {
  setCompany: actions.setCompany,
  setUser: actions.setUser
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddCompany);
