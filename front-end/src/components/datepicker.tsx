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
    return days; // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.appointment.weekNumber]);

  return (
    <div className="datepickerCompany">
      <table className="centered backgroundCards container hoverable datepicker">
        <thead>
          <tr>
            <th colSpan={9}>
              {props.appointment.monthLong.toLocaleUpperCase()} -{" "}
              {props.appointment.year}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className="daysWeek">
            <td onClick={sub} className="colDatepicker waves-effect">
              <i className="material-icons">chevron_left</i>
            </td>
            {days.map(d => (
              <td
                key={d.day + "-" + d.month + "-" + d.year}
                onClick={() =>
                  props.setAppointment(
                    props.appointment.set({
                      day: d.day,
                      month: d.month,
                      hour: 0
                    })
                  )
                }
                className={`waves-effect colDatepicker ${props.appointment
                  .day === d.day && "teal lighten-1  white-text"}`}
              >
                <p className="weekdayLong">{d.weekdayShort.toLocaleUpperCase()}</p>
                <h5>{d.day}</h5>
              </td>
            ))}
            <td onClick={add} className="colDatepicker waves-effect">
              <i className="material-icons">chevron_right</i>
            </td>
          </tr>
          <tr>
            <td colSpan={9}>
              {DateTime.local().toFormat("yyyy LLL dd") >
              props.appointment.toFormat("yyyy LLL dd") ? (
                <h4>No puedes reservar citas anteriores a la fecha actual</h4>
              ) : (
                <Timepicker
                  isToday={
                    props.appointment.toFormat("yyyy LLL dd") ===
                    DateTime.local().toFormat("yyyy LLL dd")
                  }
                />
              )}
            </td>
          </tr>
        </tbody>
      </table>
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
