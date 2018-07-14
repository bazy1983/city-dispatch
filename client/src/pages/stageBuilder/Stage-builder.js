import React, { Component } from "react";
import axios from "axios";

class StageBuilder extends Component {

    onSubmiHandler = (e) => {
        e.preventDefault();
        let workflow = document.getElementById("workflow");
        let pageData = new FormData(workflow);
        pageData.append("flowFor", document.querySelector(".browser-default").value);
        pageData.append("stepNumber", document.querySelector("#step").value);
        pageData.append("headline", document.querySelector("#header").value);
        pageData.append("desc", document.querySelector("#textarea1").value);
        pageData.append("final", document.querySelector("#final").checked);
        
        axios({
            url : "/withFile/make-workflow-step",
            method : "post",
            data: pageData,
            contentType: false,
            cache: false,
            processData: false
        })
    }


    render() {
        return (
            <div className="valign-wrapper row">
                <div className="col card hoverable s10 pull-s1 m10 pull-m1 l10 pull-l1">
                    <form action="/withFile/make-workflow-step" method="POST" id="workflow" encType="multipart/form-data">
                        <div className="card-content">
                            <span className="card-title">Add new Stage</span>
                            <div className="row">

                                <div className="file-field input-field">
                                    <div className="btn">
                                        <span>Appropriate Image</span>
                                        <input type="file" name="file"/>
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
                                    <label htmlFor="header">header</label>
                                    <input type="text" className="validate" name="header" id="header" />
                                </div>

                                <div className="input-field col s12">
                                    <textarea id="textarea1" className="materialize-textarea"></textarea>
                                    <label htmlFor="textarea1">Instructions</label>
                                </div>

                                <div className="switch">
                                    <label>
                                        Not Final
                                    <input type="checkbox" id="final"/>
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