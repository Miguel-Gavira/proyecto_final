import React from "react";
import "./App.css";
import Landing from "./components/landing";
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Principal from "./components/principal";

const App: React.FC = () => {
  //hacer un fetch para tener todos los nombres de empresas posibles, si no hay un redirect al inicio

  return (
    <BrowserRouter>
      <div>
        <Switch>
          <Route path="/company/:companyId" exact component={Landing} />
          <Route path="/" component={Principal} />
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default App;
