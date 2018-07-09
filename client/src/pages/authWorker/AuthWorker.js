import React, { Component } from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";
import Login from "../../components/userlogin";
import Signup from "../../components/signup";
//import "./user.css"

class AuthInspector extends Component {
    render() {
        return (
            <BrowserRouter>
                {/* props come from app.js to set routes endpoints */}
                <div className="backgroundImage">
                    <Route
                        exact path="/work"
                        render={() =>
                            <Login {...this.props} role="3">
                                <div className="h6 left-align">
                                    <Link to="/employee-forget">Forgot your password? </Link>
                                    <br />
                                    
                                </div>
                            </Login>
                        }>
                    </Route>
                    <Route
                        exact path="/employee-register"
                        render={() =>
                            <Signup {...this.props}>
                                <div className="h6 left-align">
                                    <Link to="/work">Back to Login...</Link>
                                </div>
                            </Signup>
                        }>
                    </Route>
                </div>
            </BrowserRouter>
        )
    }
}

export default AuthInspector;