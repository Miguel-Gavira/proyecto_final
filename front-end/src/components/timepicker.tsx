import React, { useState } from "react";
import { DateTime, Interval } from "luxon";
import { IGlobalState } from "../reducers/reducers";
import { connect } from "react-redux";
import * as actions from "../actions";
import { IUser } from "../IUser";

interface IProps {
  isToday: Boolean;
}

interface IPropsGlobal {
  user: IUser;
  appointment: DateTime;
  setAppointment: (appointment: DateTime) => void;
}

const Timepicker: React.FC<IProps & IPropsGlobal> = props => {
  const [slots, setSlots] = useState<string[]>([]);
  const [fillSlots, setFillSlots] = useState<string[]>([]);

  const setTime = (slot: string) => {
    const [h, m] = slot.split(":");
    const ap = props.appointment.set({ hour: +h, minute: +m });
    props.setAppointment(ap);
  };

  const submit = () => {
    fetch(
      "http://localhost:8080/api/appointment/add" +
        "/" +
        props.user.companyId +
        "/" +
        props.user._id,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          appointment: props.appointment,
          service: "cosas"
        })
      }
    ).then(response => {
      if (response.ok) {
        console.log("todo bien");
      }
    });
  };

  React.useEffect(() => {
    fetch(
      "http://localhost:8080/api/schedule/" +
        props.user.companyId +
        "/" +
        props.appointment.weekday,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      }
    )
      .then(response => response.json())
      .then(schedules => {
        if (schedules) {
          setSlots([]);
          schedules.map((s: any) => {
            calcSlots(s.startTime, s.finishTime, s.company.appointmentDuration);
          });
        }
      });
    fetch(
      "http://localhost:8080/api/appointment/" +
        props.user.companyId +
        "/" +
        props.appointment.toISODate(),
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      }
    )
      .then(response => response.json())
      .then(reservedAppointments => {
        if (reservedAppointments) {
          setFillSlots([]);
          calcFillsSlots(reservedAppointments);
        }
      });
  }, [props.appointment]);

  const calcSlots = React.useCallback(
    (startTime: string, finishTime: string, duration_minutes: number) => {
      const startAppointment = DateTime.fromFormat(startTime, "HH:mm");
      const endAppointment = DateTime.fromFormat(finishTime, "HH:mm");

      const interval = Interval.fromDateTimes(startAppointment, endAppointment)
        .splitBy({ minutes: duration_minutes })
        .map(i => i.start.toFormat("HH:mm"));
      setSlots(s => [...s, ...interval]);
    },
    []
  );

  const calcFillsSlots = React.useCallback((reservedAppointments: string[]) => {
    const aux = reservedAppointments.map((r: any) =>
      DateTime.fromISO(r.appointment).toFormat("HH:mm")
    );
    setFillSlots(s => [...s, ...aux]);
  }, []);

  return (
    <div>
      <div>
        {slots.map(slot => (
          <p key={slot + "-" + props.appointment}>
            <label>
              <input
                disabled={
                  fillSlots.includes(slot) ||
                  (props.isToday && slot < DateTime.local().toFormat("HH:mm"))
                }
                name="group1"
                type="radio"
                checked={props.appointment.toFormat("HH:mm") === slot}
                onChange={() => setTime(slot)}
              />
              <span>{slot}</span>
            </label>
          </p>
        ))}
      </div>
      <button onClick={submit} className="btn waves-effect waves-light ">
        Reservar
      </button>
    </div>
  );
};

const mapStateToProps = (state: IGlobalState) => ({
  appointment: state.appointment,
  user: state.user
});

const mapDispatchToProps = {
  setAppointment: actions.setAppointment
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Timepicker);
