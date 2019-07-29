import React from "react";
import { DateTime } from "luxon";
import * as actions from "../actions";
import { connect } from 'react-redux';
import Timepicker from "./timepicker";

interface IProps {}

interface IPropsGlobal {
  setAppointment: (appointment: DateTime) => void;
}

const Datepicker: React.FC<IProps & IPropsGlobal> = props => {
  const [selectedDay, setSelectedDay] = React.useState(DateTime.local());

  const add = () => {
    setSelectedDay(d => d.plus({ week: 1 }));
  };

  const sub = () => {
    setSelectedDay(d => d.minus({ week: 1 }));
  };

  const days = React.useMemo(() => {
    const days = [];
    for (let i = 0; i < 7; i++) {
      days[i] = selectedDay.minus({
        days: selectedDay.weekday - i - 1
      });
    }
    return days;
  }, [selectedDay.weekNumber]);

  React.useEffect(() => {
    props.setAppointment(selectedDay)
  }, [selectedDay]);

  return (
    <div>
      <div>
            <h2>{selectedDay.year}</h2>
            <h2>{selectedDay.monthLong}</h2>
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
              onClick={() => setSelectedDay(d)}
              className={`waves-effect ${selectedDay.day === d.day &&
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
      <div><Timepicker/></div>
    </div>
  );
};

const mapDispatchToProps = {
  setAppointment: actions.setAppointment
};


export default connect(null,mapDispatchToProps)(Datepicker);
