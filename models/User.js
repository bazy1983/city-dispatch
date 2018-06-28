//node modules
const mongoose = require("mongoose");
const bcrypt = require("bcrypt-nodejs");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    fullname : {
        type: String,
        required : true
    },
    password : {
        type : String,
        required :true
    },
    token: { //used to reset password
        type : Number,
        default : Math.floor(Math.random()*1000000)
    },
    points : {
        type: Number,
        default: 0
    },
    email : {
        type: String
    },
    username: {
        type:String,
        required: true
    },
    birthdate: {
        type : Date,
        default : Date.now
    }
},{
    timestamps : true
})

UserSchema.methods.hashPassword = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10))
}
UserSchema.methods.comparePassword = function(password, hash) {
    return bcrypt.compareSync(password, hash)
}

module.exports = User = mongoose.model("user", UserSchema);