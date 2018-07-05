import React, { Component } from "react";

class Navbar extends Component {
    render() {
        return (
            <nav>
                <div className="nav-wrapper">
                    <a href="#" className="brand-logo center">Logo</a>
                    <ul id="nav-mobile" className="right hide-on-med-and-down">

                        <a className='dropdown-trigger btn' href='#' data-target='dropdown1'>Drop Me!</a>


                        <ul id='dropdown1' className='dropdown-content'>
                            <li><a href="#!">one</a></li>
                            <li><a href="#!">two</a></li>
                            <li className="divider" tabIndex="-1"></li>
                            <li><a href="#!">three</a></li>
                            <li><a href="#!"><i className="material-icons">view_module</i>four</a></li>
                            <li><a href="#!"><i className="material-icons">cloud</i>five</a></li>
                        </ul>
                    </ul>
                </div>
            </nav>
        )
    }
}

export default Navbar;
