import React, { Component } from "react";
import { differenceInCalendarDays } from "date-fns";

class InspectorDispatch extends Component {


    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col s12 m12">
                        <div className="card blue-grey darken-1">
                            <div className="card-content white-text left-align">
                                <span className="card-title">Dispatch Work Flow</span>
                                <hr />
                                <h4>{this.props.headline}</h4>
                                <div className="row">
                                    <div className="col s12 m10" style={{ whiteSpace: "pre-line" }}>
                                        {this.props.desc}

                                        {this.props.stepNumber === 4 ?
                                            <div>
                                                <div className="input-field col s12">
                                                    <textarea id="narratives" className="materialize-textarea"></textarea>
                                                    <label htmlFor="narratives">Textarea</label>
                                                </div>
                                            </div>
                                            : null}
                                    </div>
                                    <div className="col s12 m2">
                                        <img src={`/withfile/image/${this.props.imgName}`} alt="" width="130" height="130" />
                                    </div>
                                </div>
                            </div>
                            <div className="card-action">
                                <div className="right-align">
                                    {this.props.stepNumber === 3 ?
                                        <a href="#" onClick={this.props.dismissTicket} >Dismiss Ticket</a>
                                        : null
                                    }
                                    {this.props.stepNumber > 1 ?
                                        <a href="#" onClick={this.props.nextStep.bind(this, this.props.stepNumber-1)}>Back</a>
                                    :null}
                                    {this.props.final ?
                                        <a href="#" onClick={this.props.closeTicket}>Close</a>
                                        :
                                        <a href="#" onClick={this.props.nextStep.bind(this, this.props.stepNumber+1)}>Next</a>
                                    }

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