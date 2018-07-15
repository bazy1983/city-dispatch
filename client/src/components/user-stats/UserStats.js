import React from "react";
import "./userStats.css";

const UserStats = (props) => (
    
            <div className="col s4">
                <div className="box z-depth-2">
                    <div>
                        <div className={`boxLogo ${props.iconColor}`} style={{ boxShadow: "0px 2px 5px #8ab6da" }}>
                            <i className="material-icons medium">{props.icon}</i>
                        </div>
                        <div className="boxContext">
                            <span>Tickets</span>
                            <h2>4/4</h2>
                        </div>
                    </div>
                    <hr />
                    <div className="boxInfo">
                        <i className="material-icons">sync</i>
                        <span>Just Updated</span>
                    </div>
                </div>
            </div>

)

export default UserStats;