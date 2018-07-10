import React from "react";

const WorkerCard = (props) => (

    <div className="row">
        <div className="col s12 m12">
            <div className="card blue-grey darken-1 z-depth-3">
                <div className="card-content white-text left-align">
                    <span className="card-title">Dispatch Work Flow</span>
                    <hr />
                    <div>
                        {`Address: ${props.street}, ${props.city}, ${props.state}, ${props.zip}`}
                    </div>
                    <hr />
                    <h4>Dispatch Details</h4>
                    <div className="row">
                        <div className="col s12 m9" style={{ whiteSpace: "pre-line" }}>
                            <p><strong>Length:</strong> {props.length} </p>
                            <p><strong>Width:</strong> {props.width} </p>
                            <p><strong>Depth:</strong> {props.depth} </p>
                            <p><strong>User Description:</strong> {props.desc}</p>
                            <p><strong>Inspector Narratives:</strong> {props.inspectNarratives} </p>
                        </div>
                        <div className="col s12 m3">
                            <iframe
                            className="z-depth-3"
                                width="150"
                                height="150"
                                frameBorder="0"
                                style={{ border: "0" }}
                                src={`https://www.google.com/maps/embed/v1/place?q=${props.street},${props.city},${props.state},${props.zip}&key=AIzaSyAGqM31PgDT_Ka_hIOlkiAKDQZzCsOPZ6A`}
                                allowFullScreen>
                            </iframe>
                            <img src={`/withfile/image/${props.imgBefore}`} alt="" width="150" height="150" className="materialboxed z-depth-3" />
                        </div>
                    </div>
                </div>
                <div className="card-action">
                    <div className="right-align">
                        <a href="#">Next</a>
                    </div>
                </div>
            </div>
        </div>
    </div>

)

export default WorkerCard;