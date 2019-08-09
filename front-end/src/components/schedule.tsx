import React from "react";
import ScheduleTimepicker from "./scheduleTimepicker";

interface IProps {}

const Schedule: React.FC<IProps> = props => {
  return (
    <div>
      <ul>
        <li>
          Lunes <ScheduleTimepicker weekday={"1"} />
        </li>
        <li>
          Martes <ScheduleTimepicker weekday={"2"} />
        </li>
        <li>
          Miércoles <ScheduleTimepicker weekday={"3"} />
        </li>
        <li>
          Jueves <ScheduleTimepicker weekday={"4"} />
        </li>
        <li>
          Viernes <ScheduleTimepicker weekday={"5"} />
        </li>
        <li>
          Sábado <ScheduleTimepicker weekday={"6"} />
        </li>
        <li>
          Domingo <ScheduleTimepicker weekday={"7"} />
        </li>
      </ul>
    </div>
  );
};

export default Schedule;
