import React, { Component } from 'react';
import { BrowserRouter, Route, Link } from "react-router-dom";

import './App.css';
import User from "./pages/auth";
import UserDash from "./pages/userDash";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Route exact path="/" component={User} />
          <Route path="/profile" component={UserDash} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
