import React, { Component } from "react";
import "./inspectTicket.css";


class InspectTickets extends Component {
    
    render() {
        return (

            <li id={this.props.ticketId}>
                <div className="collapsible-header">

                        <i className="material-icons">list</i>
                         <span>Ticket: &nbsp;{this.props.street}, {this.props.city}, {this.props.state}, {this.props.zip}</span>

                    <span className="waves-effect waves-light btn btnToRight blue" onClick={this.props.dispatchJob.bind(this, this.props.ticketId)}>Dispatch Job</span>
                    
                </div>
                <div className="collapsible-body">
                    <div className="row">
                        <div className="ticketinfo col s12 m5 left-align">
                            <h2>Ticket Information:</h2>
                            <p>Length: {this.props.length}</p>
                            <p>Width: {this.props.width}</p>
                            <p>Depth: {this.props.depth}</p>
                            <p>Description: {this.props.desc}</p>
                            {/* <p>Address: </p>
                            <p>StreetName, City, State, ZIP</p> */}
                        </div>
                        <div className="col s12 m7">
                            <img className="materialboxed left" height="300" width="300" src={`/withfile/image/${this.props.img}`} alt="pothole" />
                            <iframe
                                className="right"
                                width="300"
                                height="300"
                                frameBorder="0"
                                style={{ border: "0" }}
                                src={`https://www.google.com/maps/embed/v1/place?q=${this.props.street},${this.props.city},${this.props.state},${this.props.zip}&key=AIzaSyAGqM31PgDT_Ka_hIOlkiAKDQZzCsOPZ6A`}
                                allowFullScreen></iframe>
                            {/* <iframe src="" frameborder="0"></iframe> */}
                        </div>

                    </div>
                </div>
            </li>


        )
    }
}

export default InspectTickets;