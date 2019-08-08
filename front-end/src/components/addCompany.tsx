import React from "react";
import { IGlobalState } from "../reducers/reducers";
import { connect } from "react-redux";
import { IUser } from "../IUser";
import { ICompany } from "../ICompany";
import * as actions from "../actions";
import { RouteComponentProps } from "react-router";

interface IProps {}

interface IPropsGlobal {
  user: IUser;
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
  ] = React.useState("");
  const [editMode, setEditMode] = React.useState(false);

  const updateEditMode = () => {
    setEditMode(e => !e);
  };

  const updateInputCompanyName = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setInputCompanyName(event.target.value);
  };

  const updateInputAddress = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputAddress(event.target.value);
  };

  const updateInputTelephone = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputTelephone(event.target.value);
  };

  const updateInputType = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputType(event.target.value);
  };

  const updateInputEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputEmail(event.target.value);
  };

  const updateInputAppointmentDuration = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setInputAppointmentDuration(event.target.value);
  };

  const submit = () => {
    if (!props.user.companyId) {
      fetch("http://localhost:8080/api/company/add/" + props.user._id, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
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
              _id: "",
              companyName: d.companyName,
              owner: d.owner,
              address: d.address,
              telephone: d.telephone,
              type: d.type,
              email: d.email,
              appointmentDuration: d.appointmentDuration,
              schedule: [
                {
                  _id: "",
                  weekday: "",
                  startTime: "",
                  finishTime: ""
                }
              ]
            };
            props.setCompany(dataCompany);
          });
        }
      });
    } else {
      fetch("http://localhost:8080/api/company/edit/" + props.user.companyId, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          companyName: inputCompanyName,
          address: inputAddress,
          telephone: inputTelephone,
          type: inputType,
          email: inputEmail,
          appointmentDuration: inputAppointmentDuration
        })
      }).then(response => {
        if (response.ok) {
          response.json().then(d => {
            const dataCompany: ICompany = {
              _id: "",
              companyName: d.companyName,
              owner: d.owner,
              address: d.address,
              telephone: d.telephone,
              type: d.type,
              email: d.email,
              appointmentDuration: d.appointmentDuration,
              schedule: [
                {
                  _id: "",
                  weekday: "",
                  startTime: "",
                  finishTime: ""
                }
              ]
            };
            props.setCompany(dataCompany);
            updateEditMode();
          });
        }
      });
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
          });
        }
      });
    }
  }, [props.user]);

  return (
    <div className="SignInCompanies">
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
            onChange={updateInputCompanyName}
            value={inputCompanyName}
            type="text"
            disabled={Boolean(inputCompanyName) && !editMode}
            required
          />
          <label className={inputCompanyName && " active"}>
            Nombre de la empresa
          </label>
        </div>
      </div>

      <div className="col m12 l12">
        <div className="input-field">
          <i className="material-icons prefix">lock</i>
          <input
            onChange={updateInputAddress}
            value={inputAddress}
            type="text"
            disabled={Boolean(inputAddress) && !editMode}
            required
          />
          <label className={inputAddress && " active"}>Dirección</label>
        </div>
      </div>

      <div className="col m12 l12">
        <div className="input-field">
          <i className="material-icons prefix">lock</i>
          <input
            onChange={updateInputTelephone}
            value={inputTelephone}
            type="number"
            disabled={Boolean(inputTelephone) && !editMode}
            required
          />
          <label className={inputTelephone && " active"}>Telefono</label>
        </div>
      </div>

      <div className="col m12 l12">
        <div className="input-field">
          <i className="material-icons prefix">lock</i>
          <input
            onChange={updateInputType}
            value={inputType}
            type="text"
            disabled={Boolean(inputType) && !editMode}
            required
          />
          <label className={inputType && " active"}>Sector</label>
        </div>
      </div>

      <div className="col m12 l12">
        <div className="input-field">
          <i className="material-icons prefix">lock</i>
          <input
            onChange={updateInputEmail}
            value={inputEmail}
            type="text"
            disabled={Boolean(inputEmail) && !editMode}
            required
          />
          <label className={inputEmail && " active"}>Email</label>
        </div>
      </div>

      <div className="col m12 l12">
        <div className="input-field">
          <i className="material-icons prefix">lock</i>
          <input
            onChange={updateInputAppointmentDuration}
            value={inputAppointmentDuration}
            type="number"
            disabled={Boolean(inputAppointmentDuration) && !editMode}
            required
          />
          <label className={inputAppointmentDuration && " active"}>
            Duración de una cita
          </label>
        </div>
      </div>

      {editMode && (
        <div className="center">
          <button onClick={submit} className="btn waves-effect waves-light">
            Enviar
          </button>
        </div>
      )}

      {!editMode && (
        <div className="center">
          <button
            onClick={updateEditMode}
            className="btn waves-effect waves-light "
          >
            Editar
          </button>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state: IGlobalState) => ({
  user: state.user
});

const mapDispatchToProps = {
  setCompany: actions.setCompany
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddCompany);
