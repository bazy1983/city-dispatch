const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const TicketSchema = new Schema({
    userId: { //user part
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
    notify : {
        type : Boolean
    },
    notifyType : {
        type : String
    },
    inspectorId: { //inspector part
        type : String
    },
    assignedToInspector : {
        type : Boolean,
        default: false
    },
    inspectStage : {
        type: Number,
        default: 0
    },
    inspectNarratives: {
        type : String
    },
    inspecterOpen: {
        type : Boolean,
        default : false
    },
    inspectDate : { 
        type : String
    },
    approved: {
        type : Boolean
    },
    dispatchable: { 
        type: Boolean,
        default: false
    },
    teamId: { // deispatch team part
        type : String
    },
    dispatched : {
        type : Boolean,
        default: false
    },
    dispatchStage : {
        type : Number,
        default : 1
    },
    imgAfter: {
        type: String
    },
    workerNarratives : {
        type: String
    },
    closed: {
        type : Boolean,
        default : false
    }
},{
    timestamps : true
})

module.exports = Ticket = mongoose.model("ticket", TicketSchema);