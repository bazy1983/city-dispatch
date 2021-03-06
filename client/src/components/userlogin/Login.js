import React, { Component } from "react";
import "./login.css"

class Login extends Component {
    render() {
        return (
            <div className="valign-wrapper row login-box">
                <div className="col card hoverable s10 pull-s1 m6 pull-m3 l4 pull-l4">
                    {/* endpoint comes from app.js */}
                    <form action={this.props.login} method="POST">
                        <div className="card-content">
                            <span className="card-title">Please Login</span>
                            <div className="row">
                                <div className="input-field col s12">
                                    <label htmlFor="username">Enter Username</label>
                                    <input type="text" className="validate" name="username" id="username" />
                                </div>
                                <div className="input-field col s12">
                                    <label htmlFor="password">Password </label>
                                    <input type="password" className="validate" name="password" id="password" />
                                    <input type="hidden" id="custId" name="roleId" value={this.props.roleid}/>
                                </div>
                            </div>
                        </div>
                        <div className="card-action right-align">
                            <input type="reset" id="reset" className="btn-flat grey-text waves-effect" />
                            <input type="submit" className="btn green waves-effect waves-light" value="Login" />
                        </div>
                    </form>
                        {this.props.children}
                </div>
            </div>
        )
    }
}

export default Login