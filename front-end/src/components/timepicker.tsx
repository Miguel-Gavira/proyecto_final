import React from "react";
import { DateTime } from "luxon";
import { IGlobalState } from "../reducers/reducers";
import { connect } from "react-redux";

interface IProps {}

interface IPropsGlobal {
  appointment: DateTime;
}

const Timepicker: React.FC<IProps & IPropsGlobal> = props => {

  const id = "5d3575b89b937ed411990352"; //TODO: cambiar para mandar el id de la company
  React.useEffect(() => {
    fetch(
      "http://localhost:8080/api/schedule/" +
        id +
        "/" +
        props.appointment.weekday,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      }
    ).then(response => {
      if (response.ok) {
        //TODO: crear una interfaz para los objetos que llegan de la base de datos
        response.json().then((documents: any) => {
          console.log(documents.startTime);
        });
      }
    });
  }, [props.appointment]);
  return <div>{props.appointment.weekdayLong}</div>;
};

const mapStateToProps = (state: IGlobalState) => ({
  appointment: state.appointment
});

export default connect(mapStateToProps)(Timepicker);
