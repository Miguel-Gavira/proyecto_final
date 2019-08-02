import { TAction } from "../actionTypes";
import { IUser } from '../IUser';

const initialState: IUser = {
    username: "",
    email: "",
    _id: "",
    companyId: "",
    companyName:""
}

export const userReducer = (
    state: IUser = initialState, 
    action: TAction
): IUser => {
    if (action.type ===  "SET_USER") {
        return action.user;
    }
    return state;
}