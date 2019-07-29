import { ActionCreator } from "redux";
import { TAction } from "./actionTypes";
import { DateTime } from 'luxon';

export const setToken: ActionCreator<TAction> = (token: string) => ({
  type: "SET_TOKEN",
  token
});

export const setAppointment: ActionCreator<TAction> = (appointment: DateTime) => ({
  type: "SET_APPOINTMENT",
  appointment
});
