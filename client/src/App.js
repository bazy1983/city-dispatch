import React, { Component } from 'react';
import { BrowserRouter, Route, Link } from "react-router-dom";

import './App.css';
import User from "./pages/authUser";
import UserDash from "./pages/userDash";
import UathInspector from "./pages/authInspector"

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Route exact path="/" render={()=><User login="/auth/login" signup="/auth/signup"></User>} />
          <Route exact path="/profile" component={UserDash} />
          <Route exact path="/inspect" render={()=><UathInspector login="/auth/inspect-login" signup="/auth/inspect-signup"/>}/>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
