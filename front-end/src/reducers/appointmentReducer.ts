import { TAction } from "../actionTypes";
import { DateTime } from "luxon";

const initialState: DateTime = DateTime.local().set({
  second: 0,
  millisecond: 0
});

export const appointmentReducer = (
  state: DateTime = initialState,
  action: TAction
): DateTime => {
  if (action.type === "SET_APPOINTMENT") {
    return action.appointment;
  }
  return state;
};
