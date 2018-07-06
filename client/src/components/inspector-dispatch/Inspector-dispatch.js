import React, { Component } from "react";

class InspectorDispatch extends Component {
    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col s12 m12">
                        <div className="card blue-grey darken-1">
                            <div className="card-content white-text">
                                <span className="card-title">Card Title</span>
                                <p>I am a very simple card. I am good at containing small bits of information.
          I am convenient because I require little markup to use effectively.</p>
                            </div>
                            <div className="card-action">
                                <div className="right-align">
                                    <a href="#" >Back</a>
                                    <a href="#" >Next</a>
                                    {this.props.invalidTicketBtn? 
                                        <a href="#" >Dismiss Ticket</a>
                                    :null}

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default InspectorDispatch;