import React, { Component } from "react";

import Navbar from "../../components/employee-navbar";
import ClosedTickets from "../../components/closed-tickets";
import WorkerCard from "../../components/workerCard";
import Loader from "../../components/loader";
import "./cityworker.css";

import API from "../../util/API";


class CityWorker extends Component {

    state = {
        dispatched: false,
        job: "",
        closedJobs: "",
        worker: {},
        loading: true,
        stage: "",
        noJobs: ""
    }

    componentDidMount() {
        //get employee id from cookie
        let id;
        var value = "; " + document.cookie;
        var parts = value.split("; _acc=");
        if (parts.length === 2) {
            id = parts.pop().split(";").shift().replace("j%3A%22", "").replace("%22", "");
            if (id === "") {
                window.location = "/work"
            }
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
                .catch((err) => {
                    console.log(err)
                })

        }

        API.checkDispatch(id) //employee id
            .then((job) => {
                this.setState({
                    loading: false
                })
                // console.log(job.data)
                if (!Array.isArray(job.data)) { //if jobs not closed
                    API.getStage(job.data.dispatchStage, 2)
                        .then((instructions) => {
                            this.setState({
                                job: job.data,
                                loading: false,
                                stage: instructions.data,
                                closedJobs: ""
                            })
                            // console.log(this.state)
                        })
                } else {
                    this.setState({ //send closed jobs to completed list
                        closedJobs: job.data,
                        job: "",
                        loading: false,
                        stage: ""
                    })
                    // console.log(this.state)
                }
            })

            .catch((err) => {
                console.log(err)
            })

    } //end of componentDidMount

    onDispatchHandler = () => { //click on dispatch a job
        API.dispatchJob(this.state.worker.id)
            .then((job) => {
                if (!job.data.hasOwnProperty("job")) { // if job found
                    API.getStage(job.data.dispatchStage, 2) //1 = inspector
                        .then((instructions) => {
                            this.setState({
                                job: job.data,
                                stage: instructions.data,
                                onJobs: ""
                            })
                        })
                } else { //no jobs found
                    console.log(job.data.job)
                    this.setState({ noJobs: job.data.job })
                }
            })
    }

    nextStep = (step) => {
        let notes = document.querySelector("#narratives");
        if (notes) {
            let FileUpload = new FormData (document.querySelector("#workerForm"))
            FileUpload.append("narratives", notes.value)
            FileUpload.append("ticketId", this.state.job._id)
            API.uploadImg(FileUpload)
            
            // API.addNarratives(notes.value, this.state.oneTicket._id);
        }
        API.getStage(step, 2, this.state.job._id)
            .then((instructions) => {
                this.setState({ stage: instructions.data })
            })
    }

    closeTicket = () => {
        API.closeOut(this.state.job._id, 2)
            .then(() => {
                this.setState({ loading: true, job: "" })
                this.componentDidMount()
            })
    }

    render() {
        return (
            <div>
                <Navbar fullname={this.state.worker.fullname} />
                <div className="container">
                    {this.state.loading ?
                        <Loader />
                        :
                        <div>
                            {
                                this.state.job ?
                                    <WorkerCard closeTicket={this.closeTicket} nextStep={this.nextStep} {...this.state.job} {...this.state.stage} {...this.state.closedJobs} />
                                    :
                                    <div>
                                        <ClosedTickets closedJobs={this.state.closedJobs} />
                                        <button className="btn" onClick={this.onDispatchHandler}>Dispatch a job</button>
                                        {this.state.noJobs ?
                                            <h5>{this.state.noJobs}</h5>
                                            : null}
                                    </div>
                            }
                        </div>
                    }

                </div>
            </div>
        )
    }
}

export default CityWorker;