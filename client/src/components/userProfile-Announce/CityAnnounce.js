import React from "react";
import Weather from "../weather";

const CityAnnounce= () =>  (
            <div className="row container">
                <div className="col s12 m6">
                    <div className="card light-blue darken-2">
                        <div className="card-content white-text">
                            <span className="card-title ">City Announcements</span>
                            <div className="card-action left-align " style={{minHeight : "210px"}}>
                                <p>Welcome to Pothole Patchers, or (PHP).</p>
                                <p>We build this system so we can help each other building our city, and also have fun.</p>
                                <p>You also get rewarded helping us finding potholes.</p>
                                <p>Happy Fecthing!</p>
                            </div>
                        </div>
                        <div className="card-action">
                            <a style={{pointerEvents:"none"}} >see More</a>
                            
                        </div>
                    </div>
                </div>
                <div className="col s12 m6">
                    {/* weather is comming from userdash state */}
                    <Weather />
                </div>
            </div>
        )


export default CityAnnounce;