import React, { Component } from "react";

class StageBuilder extends Component {

    onSubmiHandler = (e)=> {
        e.preventDefault();
        console.log("okay")
    }

    render() {
        return (
            <div className="valign-wrapper row login-box">
                <div className="col card hoverable s10 pull-s1 m6 pull-m3 l4 pull-l4">
                    <form action={this.props.signup} method="POST">
                        <div className="card-content">
                            <span className="card-title">Add new Stage</span>
                            <div className="row">

                                <div className="file-field input-field">
                                    <div className="btn">
                                        <span>Appropriate Image</span>
                                        <input type="file" style={{top: "190px",width: "48%",height: "15%"}}/>
                                    </div>
                                    <div className="file-path-wrapper">
                                        <input className="file-path validate" type="text" />
                                    </div>
                                </div>

                                <div className="input-field col s12">
                                    <select className="browser-default">
                                        <option defaultValue="">Choose your option</option>
                                        <option value="1">Inspector</option>
                                        <option value="2">Road Worker</option>
                                    </select>
                                    
                                </div>

                                <div className="input-field col s12">
                                    <label htmlFor="step">Step Number</label>
                                    <input type="number" className="validate" name="step" id="step" />
                                </div>

                                <div className="input-field col s12">
                                    <label htmlFor="desc">Description</label>
                                    <input type="text" className="validate" name="desc" id="desc" />
                                </div>

                                <div className="switch">
                                    <label>
                                        Not Final
                                    <input type="checkbox" />
                                        <span className="lever"></span>
                                        Final Step
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className="card-action right-align">
                            {/* <input type="reset" id="reset" className="btn-flat grey-text waves-effect" /> */}
                            <input type="submit" className="btn green waves-effect waves-light" value="Send" onClick={this.onSubmiHandler} />
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default StageBuilder;