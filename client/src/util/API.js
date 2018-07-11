import axios from "axios";

export default {
    authenticate: function() {
        return axios.get("/auth/authenticate-person")
    },
    getUser : function(id) {
        return axios.get("/api/getUser/" + id);
    },
    logout : function() {
        return axios.get("/auth/logout")
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
    getStage : function(stage, employee, ticketId){
        return axios.get("/api/stage",{params: {
            flowFor : employee,
            stepNumber : stage,
            id : ticketId
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
    },
    dismiss : function(ticketId){
        return axios.put("api/dismiss-ticket", {
            id : ticketId
        })
    },
    closeOut : function(ticketId, employee){
        return axios.put("/api/closeTicket", {
            id : ticketId,
            employee : employee
        } )
    },
    addNarratives: function(notes, ticketId){
        return axios.put("/api/narratives", {
            notes : notes,
            id : ticketId
        })
    },// Start of city worker methods
    dispatchJob: function(employeeId){
        return axios.get("/api/getOneJob/"+employeeId)
    },
    checkDispatch: function(employeeId){
        return axios.get("/api/check-dispatch/" + employeeId)
    },
    ticketMonthCount : function(){
        return axios.get("/api/tickets-per-month")
    },
    InspectedMonthCount : function(){
        return axios.get("/api/inspected-per-month")
    }
}