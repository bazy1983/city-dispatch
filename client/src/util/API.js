import axios from "axios";

export default {
    getUser : function(id) {
        return axios.get("/api/getUser/" + id);
    },
    getTickets : function(employeeId) {
        return axios.get("/api/all-tickets/" + employeeId);
    },
    getEmployee: function(id) {
        return axios.get("/api/getEmployee/" + id)
    },
    dispatchOne : function(ticketId, inspectorId) {
        return axios.put("/api/dispatchOne", {
            ticketId : ticketId,
            inspectorId : inspectorId
        })
    },
    getStage : function(stage, employee){
        return axios.get("/api/stage",{params: {
            flowFor : employee,
            stepNumber : stage
        }})
    },
    makeWorkflowStep: function(data){
        return axios({
            url : "/withFile/make-workflow-step",
            method : "post",
            data: data,
            contentType: false,
            cache: false,
            processData: false
        })
    }
}