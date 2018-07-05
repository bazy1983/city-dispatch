import React, { Component } from "react";
import API from "../../util/API";
import "./inspector.css";

import InspectTickets from "../../components/inspectTickets";
import Navbar from "../../components/inspector-navbar";

class Inspector extends Component {

    state = {
        tickets: []
    }

    componentDidMount() {
        API.getTickets()
            .then((tickets) => {
                console.log(tickets.data)
                this.setState({ tickets: tickets.data })
            })
    }

    render() {
        return (
            <div>
                <Navbar />

                <ul className="collapsible popout ticket" >
                    {this.state.tickets.map((ticket) => {
                        return (
                            <InspectTickets
                                key={ticket._id}
                                ticketId = {ticket._id}
                                street={ticket.street}
                                city={ticket.city}
                                state={ticket.state}
                                zip={ticket.zip}
                                length={ticket.length}
                                width={ticket.width}
                                depth={ticket.depth}
                                desc={ticket.desc}
                            />
                        )
                    })}
                </ul>


            </div>
        )
    }
}

export default Inspector;