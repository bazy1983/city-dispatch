import React, { Component } from "react";

class InspectorDispatch extends Component {

    state = {
        invalidTicketBtn : false
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col s12 m12">
                        <div className="card blue-grey darken-1">
                            <div className="card-content white-text left-align">
                                <span className="card-title">Dispatch Work Flow</span>
                                <hr />
                                <div className="row">
                                    <div className="col s12 m9">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Minima, velit laudantium? Placeat dolorem quae deserunt rem autem impedit necessitatibus maiores natus quod, neque error porro pariatur odio blanditiis laboriosam laudantium.</div>
                                    <div className="col s12 m3">image goes here</div>
                                </div>
                            </div>
                            <div className="card-action">
                                <div className="right-align">
                                    {this.props.invalidTicketBtn ?
                                        <a href="#" >Dismiss Ticket</a>
                                        : null}
                                    <a href="#" >Next</a>

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