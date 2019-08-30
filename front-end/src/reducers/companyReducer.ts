import { TAction } from "../actionTypes";
import { ICompany } from "../ICompany";

const initialState: ICompany = {
  _id: "",
  companyName: "",
  owner: "",
  address: "",
  telephone: 0,
  type: "",
  email: "",
  appointmentDuration: 0
};

export const companyReducer = (
  state: ICompany = initialState,
  action: TAction
): ICompany => {
  if (action.type === "SET_COMPANY") {
    return action.company;
  }
  return state;
};
