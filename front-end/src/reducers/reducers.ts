import { combineReducers } from "redux";
import { tokenReducer } from "./tokenReducer";
import { appointmentReducer } from "./appointmentReducer"
import { DateTime } from "luxon";

export interface IGlobalState {
  token: string;
  appointment: DateTime;
}

export const reducers = combineReducers<IGlobalState>({
  token: tokenReducer,
  appointment: appointmentReducer
});
