import React, { Component } from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";
import UserProfile from "../../components/userProfile";
import CityAnnounce from "../../components/userProfile-Announce";
import CreateTicket from "../../components/createTicket/CreateTicket";
import axios from "axios";
import API from "../../util/API";


class UserDash extends Component {
    state = {
        weather: ""
    }
    
    componentWillMount() {
        API.authenticate()
        .then((check)=>{
            if(check.data.redirect){
                window.location = check.data.redirect;
            }
        })
    }

    componentDidMount() {
        navigator.geolocation.getCurrentPosition((pos) => {
            let lat = pos.coords.latitude;
            let log = pos.coords.longitude;

            axios.get(`api/getWeather/${lat}/${log}`)
                .then((weather) => {
                    console.log(weather.data)
                })
        })
    }

    logout = (e) => {
        e.preventDefault();
        axios.get("/auth/logout")
            .then(() => {
                window.location = "/"
            })
    }

    render() {
        return (
            <BrowserRouter>
                <div>
                    <UserProfile>
                        <li><Link to="/profile/potholeTicket"><i className="material-icons">create</i>Report a Pothole</Link></li>
                        <li><a href="#!"><i className="material-icons">person</i>Edit Profile</a></li>
                        <li><div className="divider"></div></li>
                        <li><a href="#!"><i className="material-icons">check_box_outline_blank</i>View pending tickets</a></li>
                        <li><a href="#!"><i className="material-icons">check</i>View completed tickets</a></li>
                        <li><a href="#!"><i className="material-icons">close</i>View rejected tickets</a></li>
                        <li><div className="divider"></div></li>
                        <li><a href="#!"><i className="material-icons">insert_chart</i>Stats</a></li>
                        <li><a href="/" onClick={this.logout}><i className="material-icons">exit_to_app</i>Signout</a></li>
                        <li><a className="waves-effect" href="#!">Third Link With Waves</a></li>
                        <li><a className="subheader">Subheader</a></li>
                    </UserProfile>
                    <CityAnnounce />
                    <Route exact path="/profile/potholeTicket" component={CreateTicket} />
                </div>
            </BrowserRouter>
        )
    }
}

export default UserDash;