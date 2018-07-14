import React from "react";

const ClosedTickets = (props) => (
    <ul className="collection with-header z-depth-3">
        <li className="collection-header left-align"><h4>Completed Tickets</h4></li>
        {props.closedJobs.length > 0 ?
            props.closedJobs.map((el) => {
                return (
                    <li
                        className="collection-item left-align"
                        key={el._id}
                    >
                        <div className="left">
                            <i className="material-icons">assignment</i> <span style={{position: "relative",top: "-7px"}}>{el.street}, {el.city}, {el.state}, {el.zip}</span>
                        </div>
                        <div className="right">
                            <span> Duration: {el.dispatchDuration} hours</span>
                        </div>
                    </li>
                )
            })
            :
            <li className="collection-item">You haven't completed any jobs today!</li>
        }
    </ul>
);

export default ClosedTickets;