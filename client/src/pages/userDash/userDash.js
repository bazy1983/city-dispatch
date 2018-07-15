import React, { Component } from "react";
// import { BrowserRouter, Route, Link } from "react-router-dom";
import UserProfile from "../../components/userProfile";
import CityAnnounce from "../../components/userProfile-Announce";
import CreateTicket from "../../components/createTicket/CreateTicket";
import API from "../../util/API";
import "./userDash.css";
import Toast from "../../components/toast";
import UserStats from "../../components/user-stats";



class UserDash extends Component {
    state = {
        weather: [],
        showCreateTicket: false,
        showAnnounce: true,
        showStats : false
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
                <Toast />
                <UserProfile>
                    {/* points can be found in userprofile component */}
                    <li className="pointer"><a className="waves-effect waves-purple" onClick={this.ShowComponentHandler.bind(this, "showCreateTicket")}><i className="material-icons" style={this.state.showCreateTicket ? { color: "red" } : null}>create</i>Report a Pothole</a></li>
                    <li className="pointer"><a className="waves-effect waves-purple" onClick={this.ShowComponentHandler.bind(this, "showAnnounce")}><i className="material-icons" style={this.state.showAnnounce ? { color: "red" } : null}>announcement</i>Announcements</a></li>
                    <li><div className="divider"></div></li>
                    <li><a className="waves-effect waves-purple" ><i className="material-icons" style={this.state.showCreateTicket ? { color: "red" } : null}>person</i>Edit Profile</a></li>
                    <li><a className="waves-effect waves-purple" onClick={this.ShowComponentHandler.bind(this, "showStats")}><i className="material-icons" style={this.state.showStats ? { color: "red" } : null}>insert_chart</i>Stats</a></li>
                    <li><a className="waves-effect waves-purple" href="/" onClick={this.signout}><i className="material-icons">exit_to_app</i>Signout</a></li>


                </UserProfile>
                {this.state.showAnnounce ?
                    <CityAnnounce /> : null}
                {this.state.showCreateTicket ?
                    <CreateTicket ShowComponentHandler={this.ShowComponentHandler} /> : null}
                {this.state.showStats?
                <div className="container marginDown">
                    <div className="row">
                        <UserStats 
                        icon = "check_box_outline_blank" 
                        iconColor= "blue lighten-2"/>
                        
                        <UserStats 
                        icon = "check" 
                        iconColor= "green lighten-2"/>
                        <UserStats 
                        icon = "clear" 
                        iconColor= "red  lighten-2"/>
                    </div>
                </div>
                :null}
            </div>

        )
    }
}

export default UserDash;