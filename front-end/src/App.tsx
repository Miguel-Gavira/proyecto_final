import React from "react";
import logo from "./logo.svg";
import "./App.css";
const materialize = require("react-materialize");

const App: React.FC = () => {
  return (
    <div className="App">
      <materialize.Modal header="Modal Header" trigger={<button>click</button>}>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum
        </p>
      </materialize.Modal>
    </div>
  );
};

export default App;
