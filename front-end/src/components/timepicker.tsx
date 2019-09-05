import React, { useState, Fragment } from "react";
import { DateTime, Interval } from "luxon";
import { IGlobalState } from "../reducers/reducers";
import { connect } from "react-redux";
import * as actions from "../actions";
import { IUser } from "../IUser";
import { ICompany } from "../ICompany";

const materialize = require("react-materialize");

interface IProps {
  isToday: Boolean;
}

interface IPropsGlobal {
  token: string;
  user: IUser;
  appointment: DateTime;
  company: ICompany;
  setUser: (user: IUser) => void;
  setAppointment: (appointment: DateTime) => void;
}

const Timepicker: React.FC<IProps & IPropsGlobal> = props => {
  const [slots, setSlots] = useState<string[]>([]);
  const [fillSlots, setFillSlots] = useState<string[]>([]);
  const [userReserved, setUserReserved] = useState<any[]>([]);
  const [getUsed, setGetUsed] = useState<Boolean>(false);

  const setTime = (slot: string) => {
    const [h, m] = slot.split(":");
    const ap = props.appointment.set({ hour: +h, minute: +m });
    props.setAppointment(ap);
  };

  const deleteAppointment = (userId: string, appointmentId: string) => {
    fetch(
      "http://localhost:8080/api/appointment/delete/" +
        appointmentId +
        "/" +
        userId,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + props.token
        },
        body: JSON.stringify({
          owner: props.company.owner
        })
      }
    ).then(response => {
      if (response.ok) {
        fetches();
      }
    });
  };

  const submit = () => {
    fetch(
      "http://localhost:8080/api/appointment/add" +
        "/" +
        props.company._id +
        "/" +
        props.user._id,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + props.token
        },
        body: JSON.stringify({
          appointment: props.appointment
        })
      }
    ).then(response => {
      if (response.ok) {
        response.json().then(document => {
          const dataUser: IUser = {
            ...props.user,
            appointment: DateTime.fromISO(document.appointment).toString(),
            idAppointment: document._id
          };
          props.setUser(dataUser);
        });
        if (props.company.owner !== props.user._id) {
          const aux: any = document.getElementsByClassName("brand-logo")[0];
          aux.click();
        }
        props.setAppointment(
          props.appointment.set({
            hour: 0,
            minute: 0,
            second: 0,
            millisecond: 0
          })
        );
      }
    });
  };

  const fetches = () => {
    fetch(
      "http://localhost:8080/api/schedule/" +
        props.company._id +
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
          schedules.forEach((s: any) => {
            calcSlots(s.startTime, s.finishTime, s.company.appointmentDuration);
          });
        }
      });
    fetch(
      "http://localhost:8080/api/appointment/getOneDay/" +
        props.company._id +
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
          setUserReserved([]);
          setUserReserved(
            reservedAppointments.map((a: any) => ({
              username: a.user.username,
              userId: a.user._id,
              appointmentId: a._id
            }))
          );
        }
      });
  };

  React.useEffect(() => {
    fetches(); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.appointment]);

  React.useEffect(() => {
    setGetUsed(false);
    const timeout = setTimeout(() => {
      setGetUsed(true);
    }, 400);
    return () => clearTimeout(timeout); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.appointment.day]);

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

  if (!getUsed) {
    return (
      <materialize.Col className="center" s={12}>
        <materialize.Preloader flashing />
      </materialize.Col>
    );
  }

  let index = 0;

  return (
    <div>
      <div>
        {slots.length === 0 && <h3>Estamos cerrados</h3>}
        {slots.length > 0 &&
          slots.map(slot => {
            const i = index;
            return (
              <p key={slot + "-" + props.appointment}>
                <label>
                  <input
                    disabled={
                      fillSlots.includes(slot) ||
                      (props.isToday &&
                        slot < DateTime.local().toFormat("HH:mm"))
                    }
                    type="radio"
                    checked={props.appointment.toFormat("HH:mm") === slot}
                    onChange={() => setTime(slot)}
                  />
                  <span className="black-text fontAppointment">
                    {slot}
                    {props.appointment.toFormat("HH:mm") === slot && (
                      <button
                        onClick={submit}
                        className="reservar btn waves-effect waves-light"
                      >
                        Reservar
                      </button>
                    )}
                    {props.user._id === props.company.owner &&
                      fillSlots.includes(slot) && (
                        <Fragment>
                          <span> Cita reservada por </span>
                          <span className="userReserved">
                            {userReserved[i] && userReserved[i].username}
                          </span>
                          <br />
                          <button
                            className="cancelar btn waves-effect waves-light red"
                            onClick={() => {
                              deleteAppointment(
                                userReserved[i].userId,
                                userReserved[i].appointmentId
                              );
                            }}
                          >
                            Cancelar cita
                          </button>

                          {(index++ && false) || false}
                        </Fragment>
                      )}
                    {props.user._id !== props.company.owner &&
                      fillSlots.includes(slot) &&
                      " Cita reservada"}
                  </span>
                </label>
              </p>
            );
          })}
      </div>
      {/* {slots.length > 0 && (
        <button onClick={submit} className="btn waves-effect waves-light">
          Reservar
        </button>
      )} */}
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
  setAppointment: actions.setAppointment,
  setUser: actions.setUser
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Timepicker);
