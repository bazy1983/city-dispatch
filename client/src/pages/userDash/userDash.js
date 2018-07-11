import React, { Component } from "react";
// import { BrowserRouter, Route, Link } from "react-router-dom";
import UserProfile from "../../components/userProfile";
import CityAnnounce from "../../components/userProfile-Announce";
import CreateTicket from "../../components/createTicket/CreateTicket";
import API from "../../util/API";


class UserDash extends Component {
    state = {
        weather: "",
        showCreateTicket: false
    }


    componentDidMount() {
        API.authenticate()
            .then((check) => {
                if (check.data.redirect) {
                    window.location = check.data.redirect;
                }
            })
    }

    signout = (e) => {
        e.preventDefault();
        API.logout()
            .then(() => {
                window.location = "/"
            })
    }

    ShowComponentHandler = (stateProp) => {
        this.setState({ [stateProp]: !this.state[stateProp] })
    }

    

    render() {
        return (

            <div>
                <UserProfile>
                    <li className="pointer"><a onClick={this.ShowComponentHandler.bind(this, "showCreateTicket")}><i className="material-icons" style={this.state.showCreateTicket ? { color: "red" } : null}>create</i>Report a Pothole</a></li>
                    <li><a ><i className="material-icons" style={this.state.showCreateTicket ? { color: "red" } : null}>person</i>Edit Profile</a></li>
                    <li><div className="divider"></div></li>
                    <li><a ><i className="material-icons" style={this.state.showCreateTicket ? { color: "red" } : null}>check_box_outline_blank</i>View pending tickets</a></li>
                    <li><a ><i className="material-icons" style={this.state.showCreateTicket ? { color: "red" } : null}>check</i>View completed tickets</a></li>
                    <li><a ><i className="material-icons" style={this.state.showCreateTicket ? { color: "red" } : null}>close</i>View rejected tickets</a></li>
                    <li><div className="divider"></div></li>
                    <li><a ><i className="material-icons">insert_chart</i>Stats</a></li>
                    <li><a href="/" onClick={this.signout}><i className="material-icons">exit_to_app</i>Signout</a></li>
                    <li><a className="waves-effect" >Third Link With Waves</a></li>
                    <li><a className="subheader">Subheader</a></li>
                </UserProfile>
                <CityAnnounce />
                {this.state.showCreateTicket ?
                    <CreateTicket /> : null}
            </div>

        )
    }
}

export default UserDash;