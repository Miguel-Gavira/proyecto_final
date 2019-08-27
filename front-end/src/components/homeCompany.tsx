import React from "react";
import { connect } from "react-redux";
import * as actions from "../actions";
import { IGlobalState } from "../reducers/reducers";
import { DateTime } from "luxon";
import { ICompany } from "../ICompany";
import { IUser } from "../IUser";
import Footer from "./footer";
import { RouteComponentProps, Route } from "react-router";
import datepicker from "./datepicker";
const materialize = require("react-materialize");

interface IProps {}

interface IPropsGlobal {
  token: string;
  user: IUser;
  appointment: DateTime;
  setCompany: (company: ICompany) => void;
}

const HomeCompany: React.FC<
  IProps & IPropsGlobal & RouteComponentProps
> = props => {
  React.useEffect(() => {
    const params: any = props.match.params;
    fetch("http://localhost:8080/api/company/" + params.companyId, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    }).then(response => {
      if (response.ok) {
        response.json().then(documents => {
          const dataCompany: ICompany = {
            _id: documents._id,
            companyName: documents.companyName,
            owner:
              (documents.owner === props.user._id) ? documents.owner : "",
            address: documents.address,
            telephone: documents.telephone,
            type: documents.type,
            email: documents.email,
            appointmentDuration: documents.appointmentDuration,
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
  }, []);
  return (
    <div className="fondoCompanies">
      <div className="principal">
        <div className="introCompanies">
          <h1 className="center eslogan container">
            ¿Quieres reservar una cita?
            {props.token && (
              <materialize.Modal
                options={{ inDuration: 500, outDuration: 500 }}
                className="newCompany"
                bottomSheet
                fixedFooter={true}
                trigger={
                  <button className="waves-effect waves-light btn open cyan darken-1">
                    Reservar una cita
                  </button>
                }
                actions={
                  <materialize.Button
                    className="red waves-effect waves-light btn"
                    modal="close"
                  >
                    Cerrar
                  </materialize.Button>
                }
              >
                <Route path="/" component={datepicker} />
              </materialize.Modal>
            )}
          </h1>
        </div>
        <div className="section white z-depth-5"></div>
      </div>
      <Footer />
    </div>
  );
};

const mapStateToProps = (state: IGlobalState) => ({
  appointment: state.appointment,
  user: state.user,
  token: state.token
});

const mapDispatchToProps = {
  setCompany: actions.setCompany
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeCompany);
