import React, { Component } from "react";
import Login from "../components/userlogin";
import Signup from "../components/signup";
import { BrowserRouter, Route, Link } from "react-router-dom";
import "./user.css"

class User extends Component {
    render() {
        return (
            <BrowserRouter>
                <div className="backgroundImage">
                    <Route
                        exact path="/"
                        render={() =>
                            <Login>
                                <div className="h6 left-align">
                                    <Link to="/forget">Forgot your password? </Link>
                                    <br />
                                    Not a user? <Link to="/register">Please Register here...</Link>
                                </div>
                            </Login>
                        }>
                    </Route>
                    <Route
                        exact path="/register"
                        render={() =>
                            <Signup>
                                <div className="h6 left-align">
                                    <Link to="/">Back to Login...</Link>
                                </div>
                            </Signup>
                        }>
                        >
                </Route>
                </div>
            </BrowserRouter>
        )
    }
}

export default User;

