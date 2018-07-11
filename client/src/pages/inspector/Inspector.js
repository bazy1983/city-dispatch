import React, { Component } from "react";
// import { BrouserRouter, Route, Link, Redirect } from "react-router-dom";
import API from "../../util/API";
import "./inspector.css";

import InspectTickets from "../../components/inspectTickets";
import Navbar from "../../components/employee-navbar";
import InspectorDispatch from "../../components/inspector-dispatch";
import Loader from "../../components/loader";
import TicketStat from "../../components/inspector-ticket-stats/";


class Inspector extends Component {

    state = {
        tickets: [],
        oneTicket: "",
        inspector: {},
        loading: true,
        stage: "",
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

        //get open ticket or all non dispatched tickets, id = employee id
        API.getTickets(id)
            .then((tickets) => {
                console.log(tickets.data)
                //if ticket is open tickets var is object, else tickets var is array
                if (Array.isArray(tickets.data)) {
                    // console.log("not dispatched");
                    this.setState({ tickets: tickets.data, oneTicket: "" });

                } else {
                    // console.log("dispatched")
                    API.getStage(tickets.data.inspectStage, 1) //1 = inspector
                        .then((instructions) => {
                            // console.log(instructions.data)
                            this.setState({ tickets: [], oneTicket: tickets.data, stage: instructions.data })
                        })
                }
                this.setState({ loading: false })
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

    nextStep = (step) => {
        // let next = step + 1;
        let notes = document.querySelector("#narratives");
        if (notes) {
            API.addNarratives(notes.value, this.state.oneTicket._id);
        }

        API.getStage(step, 1, this.state.oneTicket._id)
            .then((instructions) => {
                this.setState({ stage: instructions.data })
            })
    }

    closeTicket = () => {
        API.closeOut(this.state.oneTicket._id, 1)
            .then(() => {
                this.setState({ loading: true, oneTicket: "" })
                this.componentDidMount()
            })
    }

    dismissTicket = () => {
        API.dismiss(this.state.oneTicket._id)
            .then(() => {
                this.setState({ loading: true, oneTicket: "" })
                this.componentDidMount()
            })
    }

    render() {
        return (
            <div>
                <Navbar
                    fullname={this.state.inspector.fullname}
                />
                {this.state.loading ? <Loader />
                    :
                    <div className="container">
                        <TicketStat />

                    </div>
                }
                {this.state.tickets ?
                    <div>

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
                    </div>
                    :
                    null
                }
                {this.state.oneTicket ?
                    <InspectorDispatch closeTicket={this.closeTicket} dismissTicket={this.dismissTicket} nextStep={this.nextStep} {...this.state.stage} />
                    :
                    null
                }
            </div>
        )
    }
}

export default Inspector;