import axios from "axios";

export default {
    weather: function (lat, long) {
        return axios.get(`/api/getWeather/${lat}/${long}`)
    },
    authenticate: function () {
        return axios.get("/auth/authenticate-person")
    },
    getUser: function (id) {
        return axios.get("/api/getUser/" + id);
    },
    logout: function () {
        return axios.get("/auth/logout")
    },
    getTickets: function (employeeId) {
        return axios.get("/api/all-tickets/" + employeeId);
    },
    getEmployee: function (id) {
        return axios.get("/api/getEmployee/" + id)
    },
    dispatchOne: function (ticketId, inspectorId) {
        return axios.put("/api/dispatchOne", {
            ticketId: ticketId,
            inspectorId: inspectorId
        })
    },
    getStage: function (stage, employee, ticketId) {
        return axios.get("/api/stage", {
            params: {
                flowFor: employee,
                stepNumber: stage,
                id: ticketId
            }
        })
    },
    makeWorkflowStep: function (data) {
        return axios({
            url: "/withFile/make-workflow-step",
            method: "post",
            data: data,
            contentType: false,
            cache: false,
            processData: false
        })
    },
    dismiss: function (ticketId) {
        return axios.put("api/dismiss-ticket", {
            id: ticketId
        })
    },
    closeOut: function (ticketId, employee) {
        return axios.put("/api/closeTicket", {
            ticketId: ticketId,
            employee: employee
        })
    },
    addNarratives: function (notes, ticketId) {
        return axios.put("/api/narratives", {
            notes: notes,
            id: ticketId
        })
    },// Start of city worker methods
    dispatchJob: function (employeeId) {
        return axios.get("/api/getOneJob/" + employeeId)
    },
    checkDispatch: function (employeeId) {
        return axios.get("/api/check-dispatch/" + employeeId)
    },
    ticketMonthCount: function () {
        return axios.get("/api/tickets-per-month")
    },
    InspectedMonthCount: function () {
        return axios.get("/api/inspected-per-month")
    },
    uploadImg: function (imgAfter) {
        return axios({
            url: "/withFile/new-img",
            method: "post",
            data: imgAfter,
            contentType: false,
            cache: false,
            processData: false
        })
    },
    getStats: function(userId) {
        return axios.get("/api/stats/" + userId)
    },
    clearNotification : function(userId){
        return axios({
            url : "/api/clear-notification",
            method : "put",
            data : {userId : userId}
        })
    },
    resetPoints: function(userId){
        return axios({
            url : "/api/resetPoints",
            method : "put",
            data : {userId : userId}
        })
    },
    updateUserInfo: function(userId, field, text){
        // console.log(userId, field, text)
        return axios.put("/api/update-user", {userId : userId, field : field, text : text})
    },
    changeImg : function(img){
        return axios({
            url: "/withFile/user-img",
            method: "post",
            data: img,
            contentType: false,
            cache: false,
            processData: false
        })
    },
    deleteAccount : function(userId){
        console.log(userId)
        return axios({
            url : "/auth/delete-account", 
            data : {userId : userId},
            method : "delete"
        } )
    }
}