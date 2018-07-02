const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const TicketSchema = new Schema({
    userId: {
        type : String
    },
    length: {
        type : Number
    },
    width: {
        type : Number
    },
    depth: {
        type: Number
    },
    street : {
        type : String
    },
    city : {
        type : String
    },
    state : {
        type : String
    },
    zip : {
        type : Number
    },
    desc: {
        type: String
    },
    image: {
        type: Number
    },
    inspectorId: {
        type : String
    },
    approved: {
        type : Boolean
    },
    dispatchable: {
        type: Boolean,
        default: false
    },
    teamId: {
        type : String
    },
    dispatched : {
        type : Boolean,
        default: false
    }
},{
    timestamps : true
})

module.exports = Ticket = mongoose.model("ticket", TicketSchema);