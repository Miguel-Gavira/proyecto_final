import { DateTime } from 'luxon';
import { IUser } from './IUser';
import { ICompany } from './ICompany';
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

type TSetCompany = {
  type: "SET_COMPANY";
  company: ICompany;
}

export type TAction = TSetToken | TSetAppointment | TSetUser | TSetCompany;
