//consolidate all models to one db object
module.exports = {
    User : require("./User"),
    Ticket : require("./ticket"),
    Employee : require("./Employee"),
    Workflow : require("./Workflow")
}