import React, { Component } from "react";

import Navbar from "../../components/employee-navbar";
import ClosedTickets from "../../components/closed-tickets";
import WorkerCard from "../../components/workerCard";

import API from "../../util/API";


class CityWorker extends Component {

    state = {
        dispatched: false,
        job: "",
        worker: {}
    }

    componentDidMount() {
        //get employee id from cookie
        let id;
        var value = "; " + document.cookie;
        var parts = value.split("; _acc=");
        if (parts.length === 2) {
            id = parts.pop().split(";").shift().replace("j%3A%22", "").replace("%22", "");

            API.getEmployee(id)
                .then((worker) => {
                    // console.log(worker.data)
                    this.setState({
                        worker: {
                            id: worker.data.id,
                            fullname: worker.data.fullname
                        }
                    })
                })
        }

        API.checkDispatch(id)
            .then((job) => {
                console.log(job.data)
                if (job.data) {
                    this.setState({
                        job: job.data,
                    })
                }
            })

            .catch((err) => {
                console.log(err)
            })

    }

    onDispatchHandler = () => {
        API.dispatchJob(this.state.worker.id)
            .then((job) => {
                console.log(job.data)
                if (job.data) {
                    this.setState({
                        job: job.data
                    })
                }
            })
    }

    render() {
        return (
            <div>
                <Navbar fullname={this.state.worker.fullname} />
                <div className="container">
                    {this.state.job ?
                        <WorkerCard {...this.state.job} />
                        :
                        <div>
                            <ClosedTickets />
                            <button className="btn" onClick={this.onDispatchHandler}>Dispatch a job</button>
                        </div>
                    }
                </div>
            </div>
        )
    }
}

export default CityWorker;