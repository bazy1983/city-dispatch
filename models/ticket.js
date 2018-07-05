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
    imgBefore: {
        type: String
    },
    inspectorId: {
        type : String
    },
    assignedToInspector : {
        type : Boolean,
        default: false
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