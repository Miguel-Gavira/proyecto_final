import { DateTime } from 'luxon';
type TSetToken = {
  type: "SET_TOKEN";
  token: string;
};

type TSetAppointment = {
  type: "SET_APPOINTMENT";
  appointment: DateTime;
};

export type TAction = TSetToken | TSetAppointment;
