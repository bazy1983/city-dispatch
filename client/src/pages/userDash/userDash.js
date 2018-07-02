import React, { Component } from "react";
import UserProfile from "../../components/userProfile";
import CityAnnounce from "../../components/userProfile-Announce";
import CreateTicket from "../../components/createTicket/CreateTicket";
import axios from "axios";


class UserDash extends Component {
    state = {
        weather : ""
    }

componentDidMount(){
    navigator.geolocation.getCurrentPosition((pos)=>{
        let lat = pos.coords.latitude;
        let log = pos.coords.longitude;
    
        axios.get(`api/getWeather/${lat}/${log}`)
        .then((weather)=>{
            console.log(weather.data)
        })
    })
}

    render() {
        return (
            <div>
                <UserProfile />
                <CityAnnounce />
                <CreateTicket/>
            </div>
        )
    }
}

export default UserDash;