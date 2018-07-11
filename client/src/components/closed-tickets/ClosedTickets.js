import React, { Component } from "react";

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
                    <i className="material-icons fixCloseedIcons">assignment</i> {el.street}, {el.city}, {el.state}, {el.zip}
                    </li>
                )
            })
            :
            <li className="collection-item">You haven't completed any jobs today!</li>
        }
    </ul>
);

export default ClosedTickets;