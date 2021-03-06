import React, { Component } from "react";

class Signup extends Component {
    state = {
        something: "something"
    }

    render() {
        return (
            <div className="valign-wrapper row login-box">
                <div className="col card hoverable s10 pull-s1 m6 pull-m3 l4 pull-l4">
                    <form action={this.props.signup} method="POST">
                        <div className="card-content">
                            <span className="card-title">Create New Account</span>
                            <div className="row">
                                <div className="input-field col s12">
                                    <label htmlFor="fullname">Enter Fullname</label>
                                    <input type="text" className="validate" name="fullname" id="fullname" />
                                </div>
                                <div className="input-field col s12">
                                    <label htmlFor="email">Enter Email</label>
                                    <input type="text" className="validate" name="email" id="email" />
                                </div>
                                <div className="input-field col s12">
                                    <label htmlFor="username">Enter Username</label>
                                    <input type="text" className="validate" name="username" id="username" />
                                </div>
                                <div className="input-field col s12">
                                    <label htmlFor="password">Password </label>
                                    <input type="password" className="validate" name="password" id="password" />
                                </div>
                            </div>
                        </div>
                        <div className="card-action right-align">
                            {/* <input type="reset" id="reset" className="btn-flat grey-text waves-effect" /> */}
                            <input type="submit" className="btn green waves-effect waves-light" value="Register" />
                        </div>
                    </form>
                    {this.props.children}
                </div>
            </div>
        )
    }
}

export default Signup;