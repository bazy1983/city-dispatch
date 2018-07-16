import React from "react";
import API from "../../util/API";
import "./giftcard.css"

const GiftCard =(props) => (
            <div className="gift">
            <i className="material-icons close small red" onClick = {props.close}>clear</i>
                <span>
                    <label>
                        <input name="group1" type="radio" checked />
                        <span>Apple iTunes</span>
                    </label>
                </span>
                <span>
                    <label>
                        <input name="group1" type="radio" />
                        <span>Google Play</span>
                    </label>
                </span>
                <span>
                    <label>
                        <input name="group1" type="radio" />
                        <span>Starbucks</span>
                    </label>
                </span>
                <span>
                <i className="material-icons" onClick = {props.points >= 1000? props.cardNumber : null}>details</i>
                </span>
                <div className="number"></div>
            </div>

        )


export default GiftCard;