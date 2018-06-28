import React, {Component} from "react";
import Login from "../components/userlogin";
import {Router, Route, Link} from "react-router-dom";

class User extends Component {
    render() {
        return (
            <Login/>
        )
    }
}

export default Login;