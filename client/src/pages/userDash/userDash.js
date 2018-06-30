import React, { Component } from "react";
import UserProfile from "../../components/userProfile";
import CityAnnounce from "../../components/userProfile-Announce";
import CreateTicket from "../../components/createTicket/CreateTicket";


class UserDash extends Component {
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