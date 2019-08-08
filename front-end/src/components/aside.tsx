import React from "react";
import { IGlobalState } from "../reducers/reducers";
import { connect } from "react-redux";
import { IUser } from '../IUser';
import { Link } from 'react-router-dom';

interface IProps {}

interface IPropsGlobal {
  user: IUser;
}

const Aside: React.FC<IProps & IPropsGlobal> = props => {
  return (
    <ul className="collection with-header">
      <li className="collection-header">
        <h5>{props.user.companyName}</h5>
      </li>
      <Link to={"/company/profile/appointment/" + props.user.companyId}><li className="collection-item">Mis citas</li></Link>
      <Link to={"/company/profile/info/" + props.user.companyId}><li className="collection-item">Datos de la empresa</li></Link>
      <Link to={"/company/profile/schedule/" + props.user.companyId}><li className="collection-item">Mi horario</li></Link> 
    </ul>
  );
};

const mapStateToProps = (state: IGlobalState) => ({
  user: state.user
});

export default connect(mapStateToProps)(Aside);
