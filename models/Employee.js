//node modules
const mongoose = require("mongoose");
const bcrypt = require("bcrypt-nodejs");

const Schema = mongoose.Schema;

const EmployeeSchema = new Schema({
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
    },
    role: {
        type: Number,// 1 inspector, 2 technician
        default: 3 
    }
},{
    timestamps : true
})

EmployeeSchema.methods.hashPassword = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10))
}
EmployeeSchema.methods.comparePassword = function(password, hash) {
    return bcrypt.compareSync(password, hash)
}

module.exports = Employee = mongoose.model("employee", EmployeeSchema);