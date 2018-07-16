import React from "react";
import "./userStats.css";

const UserStats = (props) => (
    
            <div className="col s12 m6 l4">
                <div className="box z-depth-2">
                    <div>
                        <div className={`boxLogo ${props.iconColor}`} style={{ boxShadow: "0px 2px 5px #b2a294" }}>
                            <i className="material-icons medium">{props.icon}</i>
                        </div>
                        <div className="boxContext">
                            <span>{props.tag} tickets</span>
                            <h2>{props.count}/{props.total}</h2>
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