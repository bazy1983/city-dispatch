import axios from "axios";

export default {
    getUser : function(id) {
        return axios.get("/api/getUser/" + id);
    },
    getTickets : function() {
        return axios.get("/api/all-tickets");
    }
}