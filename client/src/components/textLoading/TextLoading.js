import React, {Component} from "react";
import "./textLoading.css";

class TextLoading extends Component {
    render(){
        return (
            <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
        )
    }
}

export default TextLoading;