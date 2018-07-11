import React, { Component } from "react";
import API from "../../util/API";
import "./ticket-stat.css";

class TicketStat extends Component {
    state = {
        ticketCount: 0,
        inspected : 0
    }

    componentDidMount() {
        API.ticketMonthCount()
            .then((monthCount) => {
                // console.log(monthCount)
                this.setState({ ticketCount: monthCount.data.count })
            })
        API.InspectedMonthCount()
        .then((monthCount) => {
            this.setState({inspected : monthCount.data.count})
        })
    }

    render() {
        return (
            <div className="row">
                <div class="col s12 m5 offset-l1">
                    <div class="card horizontal">
                        <div class="card-stacked">
                            <div class="card-content">
                                <span className="CountText">
                                    Tickets Created This month
                            </span>
                            </div>
                            <div class="card-action">
                                <span className="CountText">{this.state.ticketCount}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col s12 m5">
                    <div class="card horizontal">
                        <div class="card-stacked">
                            <div class="card-content">
                                <span className="CountText">
                                    Tickets Inspected This month
                            </span>
                            </div>
                            <div class="card-action">
                                <span className="CountText">{this.state.inspected}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default TicketStat;