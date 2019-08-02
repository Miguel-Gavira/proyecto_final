import { combineReducers } from "redux";
import { tokenReducer } from "./tokenReducer";
import { appointmentReducer } from "./appointmentReducer"
import { DateTime } from "luxon";
import { IUser } from "../IUser";
import { userReducer } from './userReducer';

export interface IGlobalState {
  token: string;
  appointment: DateTime;
  user: IUser;
}

export const reducers = combineReducers<IGlobalState>({
  token: tokenReducer,
  appointment: appointmentReducer,
  user: userReducer
});
