import React, { Component } from "react";
// import { BrouserRouter, Route, Link, Redirect } from "react-router-dom";
import API from "../../util/API";
import "./inspector.css";

import InspectTickets from "../../components/inspectTickets";
import Navbar from "../../components/inspector-navbar";
import InspectorDispatch from "../../components/inspector-dispatch";

class Inspector extends Component {

    state = {
        tickets: [],
        oneTicket: {},
        inspector: {},
        invalidTicketBtn: true
    }

    componentDidMount() {
        //get employee id from cookie
        let id;
        var value = "; " + document.cookie;
        var parts = value.split("; _acc=");
        if (parts.length === 2) {
            id = parts.pop().split(";").shift().replace("j%3A%22", "").replace("%22", "");

            API.getEmployee(id)
                .then((inspector) => {
                    // console.log(inspector.data)
                    this.setState({
                        inspector: {
                            id: inspector.data.id,
                            fullname: inspector.data.fullname
                        }
                    })
                })
                .catch((err) => {
                    console.log(err)
                })
        }

        //get tickets
        API.getTickets(id)
            .then((tickets) => {
                //if ticket is open tickets var is object, else tickets var is array
                if (Array.isArray(tickets)) {
                    this.setState({ tickets: tickets.data, ticket: {} })
                    console.log("array")
                } else {
                    this.setState({ ticket: tickets, tickets: [] })
                    console.log("object")
                }

            })

    }

    dispatchHandler = (ticketId) => {
        API.dispatchOne(ticketId, this.state.inspector.id)
            .then((job) => {
                // console.log(job.data)
            })
        let ticket = document.getElementById(ticketId);
        // ticket.parentNode.classList.add("fadeOut")
        setTimeout(() => {
            this.componentDidMount();
        }, 800)
    }

    render() {
        return (
            <div>
                <Navbar
                    fullname={this.state.inspector.fullname}
                />
                {this.state.tickets ?
                    <ul className="collapsible popout ticket" >
                        {this.state.tickets.map((ticket) => {
                            return (
                                <InspectTickets
                                    key={ticket._id}
                                    ticketId={ticket._id}
                                    street={ticket.street}
                                    city={ticket.city}
                                    state={ticket.state}
                                    zip={ticket.zip}
                                    length={ticket.length}
                                    width={ticket.width}
                                    depth={ticket.depth}
                                    desc={ticket.desc}
                                    img={ticket.imgBefore}
                                    dispatchJob={this.dispatchHandler}
                                />
                            )
                        })}
                    </ul>
                    : 
                    null
                    }
                {this.state.ticket?
                    <InspectorDispatch
                    invalidTicketBtn = {this.state.invalidTicketBtn}
                    />
                :
                null
                }
            </div>
        )
    }
}

export default Inspector;