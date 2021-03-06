import React, { Component } from "react";
import "./navbar.css";
import API from "../../util/API";


class Navbar extends Component {

    signout = () => {
        API.logout()
            .then(() => {
                let pathname = window.location.pathname;
                if (pathname === "/city-worker") {
                    window.location = "/work"
                } else {
                    window.location = "/inspect"
                }
            })
    }
    render() {
        return (
            <nav className="indigo darken-4">
                <div className="nav-wrapper">
                    <img id="logo" src="./images/pothole.png" alt="pothole patchers" />
                    <ul id="nav-mobile" className="right hide-on-med-and-down">

                        <div className="chip dropdown-trigger" data-target='dropdown1'>
                            <img src="https://placehold.it/100/200" alt="Contact Person" />
                            {this.props.fullname}
                        </div>

                        <ul id='dropdown1' className='dropdown-content translateDown'>
                            {window.location.pathname === "/inspector" ?
                                <li><a onClick={this.props.toggleStat}>{this.props.showStat ? <span>Hide Stat</span> : <span>Show Stat</span>}</a></li>
                                : null}
                            {/* <li><a >two</a></li>
                            <li className="divider" tabIndex="-1"></li>
                            <li><a >three</a></li> */}
                            <li><a onClick={this.signout}>Logout</a></li>
                            <li><a >Exit</a></li>
                        </ul>
                    </ul>
                </div>
            </nav>
        )
    }
}

export default Navbar;
