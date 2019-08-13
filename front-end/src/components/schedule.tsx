import React from "react";
import ScheduleTimepicker from "./scheduleTimepicker";
const materialize = require("react-materialize");

interface IProps {}

const Schedule: React.FC<IProps> = props => {
  return (
    <div className="scheduleCompany">
      <div className="container scheduleCards">
        <materialize.Row>
          <materialize.Col xl={3} l={4} m={6} s={12}>
            <materialize.CardPanel className="backgroundCards hoverable">
              <span className="black-text">Lunes</span>
              <br />
              <ScheduleTimepicker weekday={"1"} />
            </materialize.CardPanel>
          </materialize.Col>
          <materialize.Col xl={3} l={4} m={6} s={12}>
            <materialize.CardPanel className="backgroundCards hoverable">
              <span className="black-text">Martes</span>
              <br />
              <ScheduleTimepicker weekday={"2"} />
            </materialize.CardPanel>
          </materialize.Col>
          <materialize.Col xl={3} l={4} m={6} s={12}>
            <materialize.CardPanel className="backgroundCards hoverable">
              <span className="black-text">Miércoles</span>
              <br />
              <ScheduleTimepicker weekday={"3"} />
            </materialize.CardPanel>
          </materialize.Col>
          <materialize.Col xl={3} l={4} m={6} s={12}>
            <materialize.CardPanel className="backgroundCards hoverable">
              <span className="black-text">Jueves</span>
              <br />
              <ScheduleTimepicker weekday={"4"} />
            </materialize.CardPanel>
          </materialize.Col>
          <materialize.Col xl={3} l={4} m={6} s={12}>
            <materialize.CardPanel className="backgroundCards hoverable">
              <span className="black-text">Viernes</span>
              <br />
              <ScheduleTimepicker weekday={"5"} />
            </materialize.CardPanel>
          </materialize.Col>
          <materialize.Col xl={3} l={4} m={6} s={12}>
            <materialize.CardPanel className="backgroundCards hoverable">
              <span className="black-text">Sábado</span>
              <br />
              <ScheduleTimepicker weekday={"6"} />
            </materialize.CardPanel>
          </materialize.Col>
          <materialize.Col xl={3} l={4} m={6} s={12}>
            <materialize.CardPanel className="backgroundCards hoverable">
              <span className="black-text">Domingo</span>
              <br />
              <ScheduleTimepicker weekday={"7"} />
            </materialize.CardPanel>
          </materialize.Col>
        </materialize.Row>
      </div>
    </div>
  );
};

export default Schedule;
