import React, { Component } from "react";

class CityAnnounce extends Component {


    render() {
        return (
            <div className="row container">
                <div className="col s12 m7">
                    <div className="card blue-grey darken-1">
                        <div className="card-content white-text">
                            <span className="card-title">City Announcements</span>
                            <div className="card-action">
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum a ea corrupti illo rem? Delectus fugit veritatis fuga beatae nostrum porro, similique non libero repellat perferendis, magni quibusdam sunt sequi?Aspernatur, ab quia rerum deleniti ad, corporis eius accusantium neque, placeat earum quos. Ratione laboriosam iusto sapiente? Voluptatem consectetur vel similique, tempora vero, praesentium iusto reprehenderit veritatis fugit qui animi?   </p>
                            </div>
                        </div>
                        <div className="card-action">
                            <a >This is a link</a>
                            <a >This is a link</a>
                        </div>
                    </div>
                </div>
                <div className="col s12 m5">
                    <div className="card blue-grey darken-1">
                        <div className="card-content white-text">
                            <span className="card-title">Card Title</span>
                            <p>I am a very simple card. I am good at containing small bits of information.
          I am convenient because I require little markup to use effectively.</p>
                        </div>
                        <div className="card-action">
                            <a >This is a link</a>
                            <a >This is a link</a>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default CityAnnounce;