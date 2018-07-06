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
    }
}