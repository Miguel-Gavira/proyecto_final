import React from "react";
import { DateTime } from "luxon";
import * as actions from "../actions";
import { connect } from "react-redux";
import Timepicker from "./timepicker";
import { IGlobalState } from "../reducers/reducers";

interface IProps {}

interface IPropsGlobal {
  appointment: DateTime;
  setAppointment: (appointment: DateTime) => void;
}

const Datepicker: React.FC<IProps & IPropsGlobal> = props => {
  const add = () => {
    props.setAppointment(props.appointment.plus({ week: 1 }));
  };

  const sub = () => {
    props.setAppointment(props.appointment.minus({ week: 1 }));
  };

  const days = React.useMemo(() => {
    const days = [];
    for (let i = 0; i < 7; i++) {
      days[i] = props.appointment.minus({
        days: props.appointment.weekday - i - 1
      });
    }
    return days;
  }, [props.appointment.weekNumber]);

  return (
    <div>
      <div>
        <h2>{props.appointment.year}</h2>
        <h2>{props.appointment.monthLong}</h2>
      </div>
      <div className="col s12">
        <ul className="pagination">
          <li onClick={sub}>
            <a href="#!">
              <i className="material-icons">chevron_left</i>
            </a>
          </li>
          {days.map(d => (
            <li
              key={d.day + "-" + d.month + "-" + d.year}
              onClick={() =>
                props.setAppointment(
                  props.appointment.set({ day: d.day, month: d.month })
                )
              }
              className={`waves-effect ${props.appointment.day === d.day &&
                "active"}`}
            >
              <a href="#!">{d.day}</a>
            </li>
          ))}
          <li onClick={add}>
            <a href="#!">
              <i className="material-icons">chevron_right</i>
            </a>
          </li>
        </ul>
      </div>
      <div>
        <Timepicker />
      </div>
    </div>
  );
};

const mapStateToProps = (state: IGlobalState) => ({
  appointment: state.appointment
});

const mapDispatchToProps = {
  setAppointment: actions.setAppointment
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Datepicker);
