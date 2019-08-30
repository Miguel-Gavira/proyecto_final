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
  company: ICompany;
  setCompany: (company: ICompany) => void;
}

const HomeCompany: React.FC<
  IProps & IPropsGlobal & RouteComponentProps
> = props => {
  const [appointmentReserved, setAppointmentReserved] = React.useState("");
  const [idAppointmentReserved, setIdAppointmentReserved] = React.useState("");

  const deleteAppointment = () => {
    console.log("que la borro");
    fetch(
      "http://localhost:8080/api/appointment/delete/" + idAppointmentReserved + "/" + props.user._id,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + props.token
        }
      }
    ).then(response => {
      if (response.ok) {
        setAppointmentReserved("");
        setIdAppointmentReserved("");
      }
    });
  };

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
            owner: documents.owner === props.user._id ? documents.owner : "",
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
  }, []);

  React.useEffect(() => {
    if (props.company._id && props.user._id) {
      fetch(
        "http://localhost:8080/api/appointment/" +
          props.company._id +
          "/" +
          props.user._id,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + props.token
          }
        }
      ).then(response => {
        if (response.ok) {
          response.json().then(documents => {
            if (DateTime.local() < DateTime.fromISO(documents.appointment)) {
              setIdAppointmentReserved(documents._id);
              setAppointmentReserved(
                DateTime.fromISO(documents.appointment).toString()
              );
            }
          });
        }
      });
    }
  }, [props.company._id, props.user._id]);

  return (
    <div className="fondoCompanies">
      <div className="principal">
        <div className="introCompanies">
          <h1 className="center eslogan container">
            {appointmentReserved
              ? "Ya tienes una cita con nosotros"
              : "¿Quieres reservar una cita?"}
            {props.token && !appointmentReserved && (
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
        <div className="section white z-depth-5">
          {props.token &&
            props.company.owner !== props.user._id &&
            // DateTime.local() < DateTime.fromISO(appointmentReserved) &&
            appointmentReserved !== "" && (
              <materialize.Row>
                <materialize.Col m={12} s={12}>
                  <materialize.Card
                    className="postit transparent z-depth-0"
                    header={
                      <div className="insidePostit">
                        <img
                          src="http://localhost:3000/images/postit.png"
                          width="100%"
                        />
                        <div className="cardText">
                          <h2 className="flow-text">Tienes una cita</h2>
                          <h5 className="flow-text">
                            HORA:
                            {DateTime.fromISO(appointmentReserved)
                              .setLocale("es")
                              .toFormat(" HH:mm")}
                          </h5>
                          <h5 className="flow-text">
                            DÍA:
                            <span>
                              {DateTime.fromISO(appointmentReserved)
                                .setLocale("es")
                                .toFormat(" EEEE dd LLLL yyyy")
                                .toLocaleUpperCase()}
                            </span>
                          </h5>
                          <h4
                            className="deletePostit flow-text"
                            onClick={deleteAppointment}
                          >
                            Eliminar
                          </h4>
                        </div>
                      </div>
                    }
                  ></materialize.Card>
                </materialize.Col>
              </materialize.Row>
            )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

const mapStateToProps = (state: IGlobalState) => ({
  appointment: state.appointment,
  user: state.user,
  token: state.token,
  company: state.company
});

const mapDispatchToProps = {
  setCompany: actions.setCompany
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeCompany);
