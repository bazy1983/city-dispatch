import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";

import './App.css';
import StageBuilder from "./pages/stageBuilder";
import User from "./pages/authUser";
import UserDash from "./pages/userDash";
import AuthInspector from "./pages/authInspector";
import Inspector from "./pages/inspector";
import AuthWork from "./pages/authWorker";
import CityWorker from "./pages/city-worker";
import NotFound from "./pages/404page"

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Switch>
            <Route exact path="/" render={() => <User login="/auth/login" signup="/auth/signup"></User>} />
            <Route exact path="/profile1" component={UserDash} />
            <Route exact path="/inspect" render={() => <AuthInspector login="/auth/inspect-login" signup="/auth/inspect-signup" />} />
            <Route exact path="/inspector" component={Inspector} />
            <Route exact path="/work" render={() => <AuthWork login="/auth/work-login" signup="/auth/work-signup" />} />
            <Route exact path="/city-worker" component={CityWorker} />
            <Route exact path="/stage-builder" component={StageBuilder} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
