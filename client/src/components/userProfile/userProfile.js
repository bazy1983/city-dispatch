import React, { Component } from "react";
import "./userProfile.css"
import API from "../../util/API";
import NotifyUser from "../../components/notify-user";
import GiftCard from "../../components/gift-card";
import EditProfile from "../../components/edit-profile";


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
        // console.log("got gift card")
        document.querySelector(".gift").classList.remove("hide-gift");
        setTimeout(() => {
            document.querySelector(".gift").classList.add("slideIn");
        }, 100);
    }

    closeGiftCard = () => {
        // console.log("got gift card")
        document.querySelector(".gift").classList.remove("slideIn");
        setTimeout(() => {
            document.querySelector(".gift").classList.add("hide-gift");
        }, 1500);
    }

    displayToast = () => {
        document.querySelector(".toast").classList.add("slideOut");
        setTimeout(() => {
            document.querySelector(".toast").classList.remove("slideOut");
        }, 3);
    }

    rerenderUserInfo = (user) => {
        console.log(user)
        this.setState({...user})
        console.log(this.state)
    }

    getGiftCardNumber = () => {
        let number = "";
        for (let i = 0; i < 20; i++) {
            let random = Math.floor(Math.random() * 9)
            if (i === 4 || i === 10 || i === 15) {
                random = "-"
                number += random
            } else {
                number += random
            }
        }
        document.querySelector(".number").textContent = number
        API.resetPoints(this.state.id)//user id
        .then((points)=>{
            // console.log(points.data)
            this.setState({points : points.data.points})
        })
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
                            <a ><img className="circle" src={this.state.avatar?`/withFile/image/${this.state.avatar}`:"./images/person.jpg"} alt="" /></a>
                            <a ><strong className="white-text name">{this.state.fullname}</strong></a>
                            <a ><strong className="white-text email">{this.state.email}</strong></a>
                        </div>
                    </li>
                    <li
                        className={this.state.points >= 1000 ? "pointer" : "pointer disabled"}
                        onClick={this.state.points >= 1000 ? this.RedeemPoints : this.displayToast}>
                        <a >
                            <i
                                className="material-icons"
                                style={this.state.showCreateTicket ? { color: "red" } : null}>attach_money
                            </i>Points: {this.state.points}/1000
                        </a>
                    </li>
                    {this.props.children}

                </ul>
                {this.props.showUser?
                <EditProfile {...this.state} rerender = {this.rerenderUserInfo}/>
                :null}
                {this.state.notify ?
                    <NotifyUser message={this.state.text} userId={this.state.id} />
                    : null}
                    <GiftCard cardNumber={this.getGiftCardNumber} points = {this.state.points} close = {this.closeGiftCard} />
            </div>
        )
    }
}

export default UserProfile;