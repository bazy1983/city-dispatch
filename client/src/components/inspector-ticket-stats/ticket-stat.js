import React, { Component } from "react";
import API from "../../util/API";
import "./ticket-stat.css";
import TextLoading from "../textLoading";

class TicketStat extends Component {
    state = {
        ticketCount: 0,
        inspected: 0,
        loading: true
    }

    componentDidMount() {
        API.ticketMonthCount()
            .then((monthCount) => {
                // console.log(monthCount)
                this.setState({ ticketCount: monthCount.data.count, loading: false })
            })
        API.InspectedMonthCount()
            .then((monthCount) => {
                this.setState({ inspected: monthCount.data.count, loading: false })
            })
    }

    render() {
        return (
            <div className="row">
                <div className="col s12 m5 offset-l1">
                    <div className="card horizontal">
                        <div className="card-stacked">
                            <div className="card-content">
                                <span className="CountText">
                                    Tickets Created This month
                            </span>
                            </div>
                            <div className="card-action">
                                {this.state.loading ? <TextLoading />
                                    :
                                    <span className="CountText">{this.state.ticketCount}</span>
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col s12 m5">
                    <div className="card horizontal">
                        <div className="card-stacked">
                            <div className="card-content">
                                <span className="CountText">
                                    Tickets Inspected This month
                            </span>
                            </div>
                            <div className="card-action">
                                {this.state.loading ? <TextLoading />
                                    :
                                    <span className="CountText">{this.state.inspected}</span>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default TicketStat;