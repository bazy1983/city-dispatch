import React, { Component } from "react";
import "./userProfile.css"
import API from "../../util/API";
class UserProfile extends Component {
    state = {
        fullname: "",
        id: "",
        username: "",
        points: 0,
        email: ""
    }

    componentDidMount() {
        let id;
        var value = "; " + document.cookie;
        var parts = value.split("; _acc=");
        if (parts.length === 2) {
            id = parts.pop().split(";").shift().replace("j%3A%22", "").replace("%22", "");
            API.getUser(id)
                .then((user) => {
                    this.setState({ ...user.data })
                    // console.log(this.state)
                })
                .catch((err) => {
                    console.log(err)
                })
        }
    }

    render() {
        return (
            <div>

                <nav className="topMargin">
                    <div className="nav-wrapper light-blue darken-3">
                        <a href="#" className="brand-logo center">Logo</a>
                        <ul id="nav-mobile" className="right hide-on-med-and-down">
                            <li><a href="sass.html">Sass</a></li>
                            <li><a href="badges.html">Components</a></li>
                            <li><a href="collapsible.html">JavaScript</a></li>
                        </ul>
                    </div>
                </nav>
                {/* <a href="#" data-target="slide-out" class="btn-floating btn-medium light-blue darken-3 sidenav-trigger"><i class="material-icons">menu</i></a> */}
                <a href="#" data-target="slide-out" className="sidenav-trigger">
                    <i className="medium material-icons leftSide">chevron_right</i>
                </a>

                <ul id="slide-out" className="sidenav">
                    <li>
                        <div className="user-view">
                            <div className="background">
                                <img src="./images/sidebar.jpg" alt="" width="300px" height="200px" />
                            </div>
                            <a ><img className="circle" src="./images/person.jpg" alt="" /></a>
                            <a ><strong className="white-text name">{this.state.fullname}</strong></a>
                            <a ><strong className="white-text email">{this.state.email}</strong></a>
                        </div>
                    </li>
                    {this.props.children}
                </ul>


            </div>
        )
    }
}

export default UserProfile;