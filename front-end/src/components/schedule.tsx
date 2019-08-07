import React from "react";
import ScheduleTimepicker from './scheduleTimepicker';

interface IProps {}

const Schedule: React.FC<IProps> = props => {
  return (
    <div>
      <ul>
        <li>Lunes <ScheduleTimepicker weekday={"monday"}/></li>
        <li>Martes <ScheduleTimepicker weekday={"tuesday"}/></li>
        <li>Miércoles <ScheduleTimepicker weekday={"wednesday"}/></li>
        <li>Jueves <ScheduleTimepicker weekday={"thursday"}/></li>
        <li>Viernes <ScheduleTimepicker weekday={"friday"}/></li>
        <li>Sábado <ScheduleTimepicker weekday={"saturday"}/></li>
        <li>Domingo <ScheduleTimepicker weekday={"sunday"}/></li>
      </ul>
    </div>
  );
};

export default Schedule;
