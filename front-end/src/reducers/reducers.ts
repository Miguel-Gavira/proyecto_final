import { combineReducers } from "redux";
import { tokenReducer } from "./tokenReducer";
import { appointmentReducer } from "./appointmentReducer"
import { DateTime } from "luxon";
import { IUser } from "../IUser";
import { userReducer } from './userReducer';
import { companyReducer } from './companyReducer';
import { ICompany } from '../ICompany';

export interface IGlobalState {
  token: string;
  appointment: DateTime;
  user: IUser;
  company:ICompany;
}

export const reducers = combineReducers<IGlobalState>({
  token: tokenReducer,
  appointment: appointmentReducer,
  user: userReducer,
  company: companyReducer
});
