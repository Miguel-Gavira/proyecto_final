import React from "react";
import { IUser } from "../IUser";
import { IGlobalState } from "../reducers/reducers";
import { connect } from "react-redux";
const materialize = require("react-materialize");

interface IProps {}

interface IPropsGlobal {
    user: IUser;
}

const Footer: React.FC<IProps & IPropsGlobal> = props => {
  return (
    <materialize.Footer
      copyrights="Creado por Miguel Gavira"
      moreLinks={<a />}
      links={<ul/>}
      className="grey darken-4"
    >
      <h5 className="white-text">{props.user.companyName?props.user.companyName:"Reserva tu cita.com"}</h5>
      <p className="grey-text text-lighten-4">
        Tu negocio abierto las 24 horas
      </p>
    </materialize.Footer>
  );
};

const mapStateToProps = (state: IGlobalState) => ({
    user: state.user
  });  

export default connect(mapStateToProps)(Footer);
