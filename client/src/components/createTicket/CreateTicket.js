import React, { Component } from "react";
import axios from "axios";

class CreateTicket extends Component {

    state = {
        lat: "",
        long: ""
    }

    componentDidMount() {
        navigator.geolocation.getCurrentPosition((pos) => {
            let lat = pos.coords.latitude;
            let long = pos.coords.longitude;
            this.setState({ lat, long })

            let uri = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&key=AIzaSyBg0e7AgzhzR0TlskMw9UaQKaEumFzEZy8`;
            axios(uri).then((location) => {
                let approximate = location.data.results.filter((el) => {
                    return el.geometry.location_type === "APPROXIMATE"
                })
                console.log(approximate)
            })
        })
    }

    render() {
        return (
            <div className="row container">
                <form className="col s12">
                    <div className="row">
                        <div className="input-field col l6 s12">
                            <i className="material-icons prefix">border_vertical</i>
                            <input id="length" required type="number" className="validate" />
                            <label htmlFor="length">Approximate length (ft)</label>
                        </div>
                        <div className="input-field col l6 s12">
                            <i className="material-icons prefix">border_horizontal</i>
                            <input id="width" required type="number" className="validate" />
                            <label htmlFor="width">Approximate width (ft)</label>
                        </div>
                        <div className="input-field col l6 s12">
                            <i className="material-icons prefix">border_outer</i>
                            <input id="depth" required type="number" className="validate" />
                            <label htmlFor="depth">Approximate depth (ft)</label>
                        </div>
                        <div className="input-field col l6 s12">
                            <i className="material-icons prefix">photo</i>
                            <input id="upload" required type="file" className="validate" />
                            <label htmlFor="upload"></label>
                        </div>
                        <div className="input-field col l12 s12">
                            <i className="material-icons prefix">description</i>
                            <input id="desc" required type="text" className="validate" />
                            <label htmlFor="desc">General Description</label>
                        </div>

                    </div>
                    <button class="btn waves-effect waves-light align-center" type="submit" name="action">Submit
                        <i class="material-icons right">send</i>
                    </button>
                </form>
            </div>
        )
    }
}

export default CreateTicket;