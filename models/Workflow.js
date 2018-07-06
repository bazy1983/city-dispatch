const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const WorkflowSchema = new Schema({
    stepNumber : {
        type : Number
    },
    flowFor : {
        type : String
    },
    desc: {
        type : String
    },
    imgName : {
        type : String
    },
    options : {
        type : Object
    },
    final : {
        type : Boolean,
        default : false
    }
})

module.exports = Workflow = mongoose.model("workflow", WorkflowSchema);