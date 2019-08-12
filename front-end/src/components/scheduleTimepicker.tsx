import React from "react";
import { ICompany } from "../ICompany";
import { connect } from "react-redux";
import { IGlobalState } from "../reducers/reducers";
import * as actions from "../actions";
import { DateTime } from "luxon";
import { IUser } from "../IUser";
const materialize = require("react-materialize");

interface IProps {
  weekday: string;
}

interface IPropsGlobal {
  user: IUser;
  company: ICompany;
  setCompany: (company: ICompany) => void;
}

const ScheduleTimepicker: React.FC<IProps & IPropsGlobal> = props => {
  const [startTimeMorning, setStartTimeMorning] = React.useState("");
  const [finishTimeMorning, setFinishTimeMorning] = React.useState("");
  const [startTimeAfternoon, setStartTimeAfternoon] = React.useState("");
  const [finishTimeAfternoon, setFinishTimeAfternoon] = React.useState("");
  const [checked, setChecked] = React.useState(Boolean(startTimeAfternoon));

  const updateChecked = () => {
    setChecked(c => !c);
  };

  const updateStartTimeMorning = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setStartTimeMorning(event.target.value);
    setFinishTimeMorning(event.target.value);
    setStartTimeAfternoon(event.target.value);
    setFinishTimeAfternoon(event.target.value);
  };

  const updateFinishTimeMorning = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFinishTimeMorning(event.target.value);
    setStartTimeAfternoon(event.target.value);
    setFinishTimeAfternoon(event.target.value);
  };

  const updateStartTimeAfternoon = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setStartTimeAfternoon(event.target.value);
    setFinishTimeAfternoon(event.target.value);
  };

  const updateFinishTimeAfternoon = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFinishTimeAfternoon(event.target.value);
  };

  const submit = () => {
    fetch(
      "http://localhost:8080/api/schedule/multipleAdd/" + props.user.companyId,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify([
          {
            ...(startTimeMorning !== finishTimeMorning && {
              weekday: props.weekday,
              startTime: startTimeMorning,
              finishTime: finishTimeMorning
            })
          },
          {
            ...(startTimeAfternoon !== finishTimeAfternoon && {
              weekday: props.weekday,
              startTime: startTimeAfternoon,
              finishTime: finishTimeAfternoon
            })
          }
        ])
      }
    );
  };

  React.useEffect(() => {
    fetch(
      "http://localhost:8080/api/schedule/" + props.user.companyId + "/" +
        props.weekday,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      }
    ).then(response => {
      if (response.ok) {
        response.json().then(documents => {
          documents[0] && setStartTimeMorning(documents[0].startTime);
          documents[0] && setFinishTimeMorning(documents[0].finishTime);
          documents[1] && setStartTimeAfternoon(documents[1].startTime);
          documents[1] && setChecked(Boolean(documents[1].startTime));
          documents[1] && setFinishTimeAfternoon(documents[1].finishTime);
        });
      }
    });
  }, []);

  const slots = React.useMemo(() => {
    return [
      "06:00",
      "06:30",
      "07:00",
      "07:30",
      "08:00",
      "08:30",
      "09:00",
      "09:30",
      "10:00",
      "10:30",
      "11:00",
      "11:30",
      "12:00",
      "12:30",
      "13:00",
      "13:30",
      "14:00",
      "14:30",
      "15:00",
      "15:30",
      "16:00",
      "16:30",
      "17:00",
      "17:30",
      "18:00",
      "18:30",
      "19:00",
      "19:30",
      "20:00",
      "20:30",
      "21:00",
      "21:30",
      "22:00",
      "22:30",
      "23:00",
      "23:30",
      "00:00"
    ];
  }, []);

  return (
    <div className="scheduleCard">
      <div>
      <p>
        <label>
          <input
            checked={checked}
            type="checkbox"
            className="filled-in"
            onChange={updateChecked}
          />
          <span>¿Tienes jornada partida?</span>
        </label>
      </p>
      </div>
        <div>
          <h5>Horario de mañana</h5>
        </div>
        <div>
          <materialize.Select
            value={startTimeMorning}
            onChange={updateStartTimeMorning}
          >
            <option value="" disabled>
              ¿A qué hora abres?
            </option>
            {slots.map(s => (
              <option value={s} key={s}>
                {s}
              </option>
            ))}
          </materialize.Select>
        </div>
        <div>
          <materialize.Select
            value={finishTimeMorning}
            onChange={updateFinishTimeMorning}
          >
            <option value="" disabled>
              ¿A qué hora cierras?
            </option>
            {slots
              .filter(
                s =>
                  DateTime.fromFormat(s, "HH:mm").diff(
                    DateTime.fromFormat(startTimeMorning, "HH:mm")
                  ).milliseconds > 0
              )
              .map(s => (
                <option value={s} key={s}>
                  {s}
                </option>
              ))}
          </materialize.Select>
        </div>
        {checked && (
          <>
            <div>
              <h5>Horario de tarde</h5>
              <materialize.Select
                value={startTimeAfternoon}
                onChange={updateStartTimeAfternoon}
              >
                <option value="" disabled>
                  ¿A qué hora abres por la tarde?
                </option>
                {slots
                  .filter(
                    s =>
                      DateTime.fromFormat(s, "HH:mm").diff(
                        DateTime.fromFormat(finishTimeMorning, "HH:mm")
                      ).milliseconds > 0
                  )
                  .map(s => (
                    <option value={s} key={s}>
                      {s}
                    </option>
                  ))}
              </materialize.Select>
            </div>
            <div>
              <materialize.Select
                value={finishTimeAfternoon}
                onChange={updateFinishTimeAfternoon}
              >
                <option value="" disabled>
                  ¿A qué hora cierras por la tarde?
                </option>
                {slots
                  .filter(
                    s =>
                      DateTime.fromFormat(s, "HH:mm").diff(
                        DateTime.fromFormat(startTimeAfternoon, "HH:mm")
                      ).milliseconds > 0
                  )
                  .map(s => (
                    <option value={s} key={s}>
                      {s}
                    </option>
                  ))}
              </materialize.Select>
            </div>
          </>
        )}
        <div className="center">
        <button className="waves-effect waves-light btn" onClick={submit}>Guardar</button>
        </div>
    </div>
  );
};

const mapStateToProps = (state: IGlobalState) => ({
  company: state.company, user: state.user
});

const mapDispatchToProps = {
  setCompany: actions.setCompany
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ScheduleTimepicker);
