import React from "react";
import { IUser } from "../IUser";
import { IGlobalState } from "../reducers/reducers";
import { connect } from "react-redux";
import { ICompany } from "../ICompany";
const materialize = require("react-materialize");

interface IProps {}

interface IPropsGlobal {
  user: IUser;
  company: ICompany;
}

const Footer: React.FC<IProps & IPropsGlobal> = props => {
  return (
    <materialize.Footer
      copyrights="Creado por Miguel Gavira"
      moreLinks={<a />}
      links={<ul />}
      className="grey darken-4"
    >
      <h5 className="white-text">
        {props.company
          ? props.company.companyName
          : "Reserva tu cita.com"}
      </h5>
      {!props.company && (
        <p className="grey-text text-lighten-4">
          Tu negocio abierto las 24 horas
        </p>
      )}
    </materialize.Footer>
  );
};

const mapStateToProps = (state: IGlobalState) => ({
  user: state.user, company: state.company
});

export default connect(mapStateToProps)(Footer);
