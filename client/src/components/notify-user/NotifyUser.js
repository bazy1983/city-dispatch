import React from "react";
import "./notifyUser.css";
import API from "../../util/API"
//this component is imported by userPorfile component


class NotifyUser extends React.Component {
    expandMessage = () => {
        document.querySelector(".notifyText").classList.toggle("expandWidth");
        API.clearNotification(this.props.userId)
        .then (()=>{
            setTimeout(() => {
                document.querySelector(".notify").classList.add("hidden")
            }, 1000);
        })
    }

    render() {
        return (
            <div>
                
                <div className="notify">
                    <p className="notifyText">{this.props.message}</p>
                    <a onClick={this.expandMessage} className="btn-floating btn-large red darken-4 pulse"><i className="material-icons ringer">notifications_active</i></a>
                </div>
            </div>
        )
    }
}

export default NotifyUser;