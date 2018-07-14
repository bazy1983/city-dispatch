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

    RedeemPoints = () => {
        console.log("got gift card")
    }

    displayToast = () => {
        document.querySelector(".toast").classList.add("slideOut");
        setTimeout(() => {
            document.querySelector(".toast").classList.remove("slideOut");
        }, 3);
    }

    render() {
        return (
            <div>

                <div style={{ transform: "translateY(30px)" }}>
                    <img id="logo" src="./images/pothole.png" alt="pothole patchers" />
                </div>

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
                    <li
                        className={this.state.points === 1000 ? "pointer" : "pointer disabled"}
                        onClick={this.state.points === 1000 ? this.RedeemPoints : this.displayToast}>
                        <a >
                            <i
                                className="material-icons"
                                style={this.state.showCreateTicket ? { color: "red" } : null}>attach_money
                        </i>Points: {this.state.points}/1000</a></li>
                    {this.props.children}
                </ul>

                <div className="toast">
                    <p>You need 1000 points!</p>
                </div>
            </div>
        )
    }
}

export default UserProfile;