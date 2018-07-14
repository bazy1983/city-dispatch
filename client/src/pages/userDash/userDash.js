import React, { Component } from "react";
// import { BrowserRouter, Route, Link } from "react-router-dom";
import UserProfile from "../../components/userProfile";
import CityAnnounce from "../../components/userProfile-Announce";
import CreateTicket from "../../components/createTicket/CreateTicket";
import API from "../../util/API";
import "./userDash.css";
import { throws } from "assert";


class UserDash extends Component {
    state = {
        weather: [],
        showCreateTicket: false,
        showAnnounce : true
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
                    {/* points can be found in userprofile component */}
                    <li className="pointer"><a className="waves-effect waves-purple" onClick={this.ShowComponentHandler.bind(this, "showCreateTicket")}><i className="material-icons" style={this.state.showCreateTicket ? { color: "red" } : null}>create</i>Report a Pothole</a></li>
                    <li className="pointer"><a className="waves-effect waves-purple" onClick={this.ShowComponentHandler.bind(this, "showAnnounce")}><i className="material-icons" style={this.state.showAnnounce ? { color: "red" } : null}>announcement</i>Announcements</a></li>
                    <li><a className="waves-effect waves-purple" ><i className="material-icons" style={this.state.showCreateTicket ? { color: "red" } : null}>person</i>Edit Profile</a></li>
                    <li><div className="divider"></div></li>
                    <li><a className="waves-effect waves-purple"><i className="material-icons" style={this.state.showCreateTicket ? { color: "red" } : null}>check_box_outline_blank</i>View pending tickets</a></li>
                    <li><a className="waves-effect waves-purple"><i className="material-icons" style={this.state.showCreateTicket ? { color: "red" } : null}>check</i>View completed tickets</a></li>
                    <li><a className="waves-effect waves-purple"><i className="material-icons" style={this.state.showCreateTicket ? { color: "red" } : null}>close</i>View rejected tickets</a></li>
                    <li><div className="divider"></div></li>
                    <li><a className="waves-effect waves-purple"><i className="material-icons">insert_chart</i>Stats</a></li>
                    <li><a className="waves-effect waves-purple" href="/" onClick={this.signout}><i className="material-icons">exit_to_app</i>Signout</a></li>
                    <li><a className="waves-effect waves-purple" >Third Link With Waves</a></li>
                    
                </UserProfile>
                {this.state.showAnnounce ?
                    <CityAnnounce />  : null}
                {this.state.showCreateTicket ?
                    <CreateTicket /> : null}
            </div>

        )
    }
}

export default UserDash;