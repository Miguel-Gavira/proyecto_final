import React from "react";
import "./App.css";
import Datepicker from './components/datepicker';
const materialize = require("react-materialize");

const App: React.FC = () => {
  return (
    <div className="App">
      <materialize.Modal header="Reserva tu cita" trigger={<button>click</button>}>
      {/* <materialize.DatePicker/> */}
       <Datepicker/>
      </materialize.Modal>
    </div>
  );
};

export default App;
