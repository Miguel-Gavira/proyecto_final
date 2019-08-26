import React from 'react';
import { connect } from "react-redux";
import { IGlobalState } from '../reducers/reducers';
import { DateTime } from 'luxon';
import { IUser } from '../IUser';

interface IProps {}

interface IPropsGlobal {
    token: string;
    user: IUser;
    appointment: DateTime;
}  

const HomeCompany: React.FC<IProps & IPropsGlobal> = props => {
    return (
        <div>hola</div>
    )
}

const mapStateToProps = (state: IGlobalState) => ({
    appointment: state.appointment,
    user: state.user,
    token: state.token
  });
  

export default connect(mapStateToProps)(HomeCompany);