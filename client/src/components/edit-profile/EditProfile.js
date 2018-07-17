import React from "react";
import "./editProfile.css"
import API from "../../util/API";
// this component is placed in userProfile
class EditProfile extends React.Component {
    state = {
        fullnameEdit: false,
        emailEdit: false,
        showDelete : false
    }

    inputToggler = (input) => {
        this.setState({ [input]: !this.state[input] });
    }
    
    imgChange = () =>{
        console.log("img")
        let img = new FormData(document.getElementById("imgchange"))
        img.append("userId", this.props.id)
        API.changeImg(img)
        .then((avatar)=>{
            this.props.rerender(avatar.data);
        })
    }

    updateUser = (input) => { //toggles input, update user document
        let field = input.replace("Edit", ""); 
        let text = document.getElementById(input).value;
        if (text) {
            API.updateUserInfo(this.props.id, field, text)
            .then((user)=>{
                // console.log(user.data)
                this.props.rerender(user.data);//this call componentDidMount form userProfile
            })
        }
        this.setState({ [input]: !this.state[input] });
    }

    onDeleteActivator = (e) => { //changes delete button color
        // console.log(e.target.value)
        if (e.target.value === "DELETE"){
            document.querySelector("#deleteBtn").classList.remove("orange", "lighten-2")
            document.querySelector("#deleteBtn").classList.add("red", "darken-2");
        } else {
            document.querySelector("#deleteBtn").classList.remove("red", "darken-2");
            document.querySelector("#deleteBtn").classList.add("orange", "lighten-2");
        }
    }

    onDeleteHandler = () => {
        let classCheck = document.querySelector("#deleteBtn").classList.contains("red")
        if (classCheck) {
            API.deleteAccount(this.props.id)
            .then(()=>{
                window.location = "/";
            })
        } else {
            this.setState({showDelete : true});
        }
    }

    render() {
        return (
            <div className="container row">
                <div className="col s12 l6 offset-l3 row white hoverable z-depth-2 editCard">
                    <form action="" encType="multipart/form-data" id= "imgchange">
                        <img src={this.props.avatar?`/withFile/image/${this.props.avatar}`:"./images/person.jpg"} alt="" height="100" width="100" className="circle reposition" />
                        <input type="file" name = "file" onChange = {this.imgChange}/>
                    </form>
                    <br />
                    <br />
                    <div className="col s12 spaceY">
                        {this.state.fullnameEdit ?
                            <div>
                                <i className="material-icons left pointer" onClick={this.updateUser.bind(this, "fullnameEdit")}>check</i>
                                <input className="left fit" type="text" id="fullnameEdit" />
                                <i className="material-icons right pointer" onClick={this.inputToggler.bind(this, "fullnameEdit")}>clear</i>
                            </div>
                            :
                            <div>
                                <i className="material-icons left">person</i>
                                <span className="left">{this.props.fullname}</span>
                                <i className="material-icons right pointer" onClick={this.inputToggler.bind(this, "fullnameEdit")}>edit</i>
                            </div>
                        }
                    </div>
                    <div className="col s12 spaceY">
                        {this.state.emailEdit ?
                            <div>
                                <i className="material-icons left pointer" onClick={this.updateUser.bind(this, "emailEdit")}>check</i>
                                <input className="left fit" type="text" id="emailEdit" />
                                <i className="material-icons right pointer" onClick={this.inputToggler.bind(this, "emailEdit")}>clear</i>
                            </div>
                            :
                            <div>
                                <i className="material-icons left">email</i>
                                <span className="left">{this.props.email}</span>
                                <i className="material-icons right pointer" onClick={this.inputToggler.bind(this, "emailEdit")}>edit</i>
                            </div>
                        }
                        <br/>
                        <br/>
                        <a className="waves-effect waves-light btn orange lighten-2 left" id="deleteBtn" onClick={this.onDeleteHandler}>Delete Account</a>
                        <input type="text" placeholder="Type in DELETE to continue" onChange={this.onDeleteActivator} id="deleteInput"/>
                    </div>
                </div>


            </div>
        )
    }
}

export default EditProfile;