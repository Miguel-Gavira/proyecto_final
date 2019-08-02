import { ActionCreator } from "redux";
import { TAction } from "./actionTypes";
import { DateTime } from 'luxon';
import { IUser } from './IUser';

export const setToken: ActionCreator<TAction> = (token: string) => ({
  type: "SET_TOKEN",
  token
});

export const setAppointment: ActionCreator<TAction> = (appointment: DateTime) => ({
  type: "SET_APPOINTMENT",
  appointment
});

export const setUser: ActionCreator<TAction> = (user: IUser) => ({
  type: "SET_USER",
  user
});
