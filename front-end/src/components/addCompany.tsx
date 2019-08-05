import React from "react";
import { IGlobalState } from "../reducers/reducers";
import { connect } from "react-redux";
import { IUser } from "../IUser";
import { ICompany } from '../ICompany';
import * as actions from '../actions';

interface IProps {}

interface IPropsGlobal {
  user: IUser;
  setCompany: (company: ICompany) => void;
}

const AddCompany: React.FC<IProps & IPropsGlobal> = props => {
  const [inputCompanyName, setInputCompanyName] = React.useState("");
  const [inputAddress, setInputAddress] = React.useState("");
  const [inputTelephone, setInputTelephone] = React.useState("");
  const [inputType, setInputType] = React.useState("");
  const [inputEmail, setInputEmail] = React.useState("");

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

  const submit = () => {
    fetch("http://localhost:8080/api/company/add/" + props.user._id, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        companyName: inputCompanyName,
        address: inputAddress,
        telephone: inputTelephone,
        type: inputType,
        email: inputEmail,
        appointmentDuration: 0
      })
    }).then(response => {
      if (response.ok) {
        const dataCompany: ICompany = {
          _id: "",
          companyName: inputCompanyName,
          owner: props.user._id,
          address: inputAddress,
          telephone: +inputTelephone,
          type: inputType,
          email: "",
          appointmentDuration: 0,
          schedule: [
            {
              _id: "",
              weekday: 0,
              startTime: "",
              finishTime: ""
            }
          ]        
        }
        props.setCompany(dataCompany);
      }
    });
  };

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
            required
          />
          <label>Nombre de la empresa</label>
        </div>
      </div>

      <div className="col m12 l12">
        <div className="input-field">
          <i className="material-icons prefix">lock</i>
          <input
            onChange={updateInputAddress}
            value={inputAddress}
            type="text"
            required
          />
          <label>Dirección</label>
        </div>
      </div>

      <div className="col m12 l12">
        <div className="input-field">
          <i className="material-icons prefix">lock</i>
          <input
            onChange={updateInputTelephone}
            value={inputTelephone}
            type="number"
            required
          />
          <label>Telefono</label>
        </div>
      </div>

      <div className="col m12 l12">
        <div className="input-field">
          <i className="material-icons prefix">lock</i>
          <input
            onChange={updateInputType}
            value={inputType}
            type="text"
            required
          />
          <label>Sector</label>
        </div>
      </div>

      <div className="col m12 l12">
        <div className="input-field">
          <i className="material-icons prefix">lock</i>
          <input
            onChange={updateInputEmail}
            value={inputEmail}
            type="text"
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
    </div>
  );
};

const mapStateToProps = (state: IGlobalState) => ({
  user: state.user
});

const mapDispatchToProps = {
  setCompany: actions.setCompany
};


export default connect(mapStateToProps, mapDispatchToProps)(AddCompany);
