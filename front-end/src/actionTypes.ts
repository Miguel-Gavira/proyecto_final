import { DateTime } from 'luxon';
import { IUser } from './IUser';
type TSetToken = {
  type: "SET_TOKEN";
  token: string;
};

type TSetAppointment = {
  type: "SET_APPOINTMENT";
  appointment: DateTime;
};

type TSetUser = {
  type: "SET_USER";
  user: IUser;
}

export type TAction = TSetToken | TSetAppointment | TSetUser;
