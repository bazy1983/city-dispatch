import React, { Component } from "react";
import "./createTicket.css";
import axios from "axios";

class CreateTicket extends Component {

    state = {
        userId: "",
        length: "",
        width: "",
        depth: "",
        street: "",
        city: "",
        state: "",
        zip: "",
        desc: ""
    }

    componentDidMount() {
        //this code get user id from cookie and query db for name and email
        var value = "; " + document.cookie;
        var parts = value.split("; _acc=");
        if (parts.length === 2) {
            let id = parts.pop().split(";").shift().replace("j%3A%22", "").replace("%22", "");
            this.setState({ userId: id })
        }

    }

    addressAutofill = (e) => {
        e.preventDefault()
        //get browser geolocation
        navigator.geolocation.getCurrentPosition((pos) => {
            let lat = pos.coords.latitude.toFixed(6); //toFixed limit the number of decimals
            let long = pos.coords.longitude.toFixed(6);
            console.log(lat, long)
            this.setState({ lat, long })

            let uri = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&key=AIzaSyBg0e7AgzhzR0TlskMw9UaQKaEumFzEZy8`;
            axios(uri).then((location) => {
                let approximate = location.data.results.filter((el) => {
                    return el.geometry.location_type === "APPROXIMATE"  //RANGE_INTERPOLATED
                })
                console.log(approximate)
            })
        })
    }

    onChangeHandler = (e) => {
        let val = e.target.value;
        let key = e.target.attributes.id.value;
        this.setState({ [key]: val })
    }

    onSubmitHandler = (e) => {
        e.preventDefault();
        let ticketForm = document.querySelector("#ticketForm");
        // console.log(ticketForm)
        let data = new FormData(ticketForm);
        data.append("userId", this.state.userId);
        data.append("length", this.state.length);
        data.append("width", this.state.width);
        data.append("depth", this.state.depth);
        data.append("street", this.state.street);
        data.append("city", this.state.city);
        data.append("state", this.state.state);
        data.append("zip", this.state.zip);
        data.append("desc", this.state.desc);
        axios({
            method: 'post',
            url: '/withfile/reportTicket',
            data: data,
            contentType: false,
            cache: false,
            processData: false
        })
            .then((result) => {
                console.log(result)
            });
        // $.ajax({
        //     url: url,
        //     type: method,
        //     data: data,
        //     contentType: false,
        //     cache: false,
        //     processData: false
        // })
        //     .done(function () {
        //         console.log("all good!")
        //     })
    }

    render() {
        return (
            <div className="row container">
                <div>
                    <h3 className="left-align">Report a pothole</h3>
                </div>
                <form id="ticketForm" className="card hoverable" onSubmit={this.onSubmitHandler} encType='multipart/form-data'>
                    <div className="row">
                        <div className="input-field col l6 s12">
                            <i className="material-icons prefix">border_vertical</i>
                            <input id="length" required type="number" className="validate" onChange={this.onChangeHandler} />
                            <label htmlFor="length">Approximate length (ft)</label>
                        </div>
                        <div className="input-field col l6 s12">
                            <i className="material-icons prefix">border_horizontal</i>
                            <input id="width" required type="number" className="validate" onChange={this.onChangeHandler} />
                            <label htmlFor="width">Approximate width (ft)</label>
                        </div>
                        <div className="input-field col l6 s12">
                            <i className="material-icons prefix">border_outer</i>
                            <input id="depth" required type="number" className="validate" onChange={this.onChangeHandler} />
                            <label htmlFor="depth">Approximate depth (ft)</label>
                        </div>
                        <div className="input-field col l6 s12">
                            <i className="material-icons prefix">timeline</i>
                            <input id="street" required type="text" className="validate" onChange={this.onChangeHandler} />
                            <label htmlFor="street">Street Address</label>
                        </div>
                        <div className="input-field col l6 s12">
                            <i className="material-icons prefix">location_city</i>
                            <input id="city" required type="text" className="validate" onChange={this.onChangeHandler} />
                            <label htmlFor="city">City</label>
                        </div>
                        <div className="input-field col l6 s12">
                            <i className="material-icons prefix">domain</i>
                            <input id="state" required type="text" className="validate" onChange={this.onChangeHandler} />
                            <label htmlFor="state">State</label>
                        </div>
                        <div className="input-field col l6 s12">
                            <i className="material-icons prefix">filter_9_plus</i>
                            <input id="zip" required type="number" className="validate" onChange={this.onChangeHandler} />
                            <label htmlFor="zip">ZIP code</label>
                        </div>
                        {/* <div className="input-field col l6 s12">
                            <i className="material-icons prefix">photo</i>
                            <input name= "file" id="upload" required type="file" className="validate" />
                            <label htmlFor="upload"></label>
                        </div> */}

                        <div class="file-field input-field">
                            <div class="btn">
                                <span>File</span>
                                <input name="file" type="file" />
                            </div>
                            <div class="file-path-wrapper">
                                <input class="file-path validate" type="text" />
                            </div>
                        </div>

                        <div className="input-field col l12 s12">
                            <i className="material-icons prefix">description</i>
                            {/* <input id="desc" required type="text" className="validate" onChange={this.onChangeHandler}/> */}
                            <textarea id="desc" class="materialize-textarea" onChange={this.onChangeHandler}></textarea>
                            <label htmlFor="desc">General Description</label>
                        </div>

                    </div>
                    <button className="btn waves-effect waves-light align-center margin-down" type="submit" name="action">Submit
                        <i className="material-icons right">send</i>
                    </button>
                    <button className="btn waves-effect waves-light align-center margin-down" onClick={this.addressAutofill}>Current Location
                        <i className="material-icons right">location_on</i>
                    </button>
                </form>
            </div>
        )
    }
}

export default CreateTicket;