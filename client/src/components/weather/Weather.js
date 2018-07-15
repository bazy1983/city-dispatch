import React, { Component } from "react";

import "./weather.css"
import API from "../../util/API";
import moment from "moment";

class Weather extends Component {

    state = {
        weather: [],
        loading : true
    }

    componentDidMount() {
        navigator.geolocation.getCurrentPosition((pos) => {
            let lat = pos.coords.latitude.toFixed(6); //toFixed limit the number of decimals
            let long = pos.coords.longitude.toFixed(6);
            // console.log(lat, long)
            API.weather(lat, long)
                .then((weather) => {
                    // console.log(weather.data.list)
                    let weatherRefined = weather.data.list.map((el) => {
                        return ({
                            weatherDesc: el.weather[0].main,
                            weatherDate: el.dt_txt,
                            weatherParams: el.main,
                            weatherImg: el.weather[0].icon
                        })
                    })

                    this.setState({ weather: weatherRefined, loading : false })
                    // console.log(this.state)

                })
        })
    }

    render() {
        return (

            <div className="header z-depth-2">
                <div className="header-top">
                    <h2><i className="material-icons">wb_sunny</i> Weather</h2>
                    {/* <ul>
                    <li><p>°F</p></li>
                    <li><p className="cen">°C</p></li>
                </ul> */}
                    <div className="clear"> </div>
                </div>
                <div className="header-bottom">
                    {this.state.loading?
                    <div className="header-bottom1 loadingImg">
                        <img src="./images/weatherloading.gif" alt="loading"/>
                    </div>
                    :null}
                    {this.state.weather.map((el, i) => {
                        if (i === 0 || i === 16) {
                            return (
                                <div className="header-bottom1" key={i}>
                                    <div className="header-head">
                                        <h4>{el.weatherDesc}</h4>
                                        <img src={`http://openweathermap.org/img/w/${el.weatherImg}.png`} alt="weather" />
                                        <h6>{el.weatherParams.temp_max}°</h6>
                                        <div className="bottom-head">
                                            <p>{moment(el.weatherDate).format("MMMM DD")}</p>
                                            <p>{moment(el.weatherDate).format("dddd")}</p>
                                        </div>
                                    </div>
                                </div>
                            )
                        } else if (i === 8 || i === 24) {
                            return (
                                <div className="header-bottom1 header-bottom2" key={i}>
                                    <div className="header-head">
                                        <h4>{el.weatherDesc}</h4>
                                        <img src={`http://openweathermap.org/img/w/${el.weatherImg}.png`} alt="weather" />
                                        <h6>{el.weatherParams.temp_max}°</h6>
                                        <div className="bottom-head">
                                            <p>{moment(el.weatherDate).format("MMMM DD")}</p>
                                            <p>{moment(el.weatherDate).format("dddd")}</p>
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                    })}



                    <div className="clear"> </div>
                </div>
            </div>
        )
    }
}

export default Weather;