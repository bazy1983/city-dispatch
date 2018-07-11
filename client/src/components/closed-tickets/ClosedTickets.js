import React, { Component } from "react";

const ClosedTickets = (props) => (
    <ul className="collection with-header z-depth-3">
        <li className="collection-header left-align"><h4>Completed Tickets</h4></li>
        {props.closedJobs ?
            props.closedJobs.map((el) => {
                return (
                    <li
                        className="collection-item left-align fixCloseedIcons"
                        key={el._id}
                    >
                    <i className="material-icons">assignment</i> {el.street}, {el.city}, {el.state}, {el.zip}
                    </li>
                )
            })
            :
            <li className="collection-item">You haven't completed any tickets today!</li>
        }
    </ul>
);

export default ClosedTickets;