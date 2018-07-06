import React, { Component } from "react";


class Navbar extends Component {
    render() {
        return (
            <nav>
                <div className="nav-wrapper">
                    <a href="#" className="brand-logo center">Logo</a>
                    <ul id="nav-mobile" className="right hide-on-med-and-down">

                        <div className="chip dropdown-trigger" data-target='dropdown1'>
                            <img src="https://placehold.it/100/200" alt="Contact Person" />
                            {this.props.fullname}
                        </div>

                        <ul id='dropdown1' className='dropdown-content translateDown'>
                            <li><a href="#!">one</a></li>
                            <li><a href="#!">two</a></li>
                            <li className="divider" tabIndex="-1"></li>
                            <li><a href="#!">three</a></li>
                            <li><a href="#!"><i className="material-icons">view_module</i>four</a></li>
                            <li><a href="#!"><i className="material-icons">exit_to_app</i>Exit</a></li>
                        </ul>
                    </ul>
                </div>
            </nav>
        )
    }
}

export default Navbar;
