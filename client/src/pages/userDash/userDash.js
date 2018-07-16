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
        showCreateTicket: false,
        showAnnounce: true,
        showStats: false,
        id : "",
        stats: ""
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
        if (stateProp === "showStats" && !this.state.showStats) {
            let userId;
            var value = "; " + document.cookie;
            var parts = value.split("; _acc=");
            if (parts.length === 2) {
                userId = parts.pop().split(";").shift().replace("j%3A%22", "").replace("%22", "");
                // console.log(userId)
                API.getStats(userId)
                    .then((stats) => {
                        this.setState({ stats: stats.data, id : userId })
                    })
            }
        }
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
                {this.state.showStats ?
                    <div className="container marginDown">
                        <div className="row">
                            <UserStats
                                icon="check"
                                iconColor="green lighten-2"
                                tag="Approved"
                                total={this.state.stats.total}
                                count={this.state.stats.approved} />

                            <UserStats
                                icon="clear"
                                iconColor="red lighten-2"
                                tag="Rejected"
                                total={this.state.stats.total}
                                count={this.state.stats.rejected} />
                            <UserStats
                                icon="check_box_outline_blank"
                                iconColor="blue lighten-2"
                                tag="Pending"
                                total={this.state.stats.total}
                                count={this.state.stats.pending} />
                        </div>
                    </div>
                    : null}
                    
                    
                    
            </div>

        )
    }
}

export default UserDash;