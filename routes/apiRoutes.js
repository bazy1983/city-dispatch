const router = require("express").Router();
const db = require("../models");
const keys = require("../config/keys");
const request = require("request");
const moment = require ("moment");

router.get("/getUser/:id", (req, res) => {
    // console.log(req.params.id)
    db.User.findById(req.params.id)
        .then((user) => {
            let { username, fullname, points, email, _id } = user //destructuring user object
            res.json({
                username: username,
                fullname: fullname,
                points: points,
                email: email,
                id: _id
            })
        })
        .catch((err) => {
            res.status(404).json({ err: "no user found" })
        })
})

//get weather information
router.get("/getWeather/:lat/:log", (req, res) => {
    // console.log(req.params)
    let URI = "https://api.openweathermap.org/data/2.5/weather?";
    let key = "&appid=" + keys.weather;
    let coord = `lat=${req.params.lat}&lon=${req.params.log}`
    let units = "&units=imperial"
    request(URI + coord + key + units, (err, response, body) => {
        if(err) console.log(err);
        body = JSON.parse(body)
        // console.log(body);
        res.json(body)
    })
})

// function handle what ticket to send
let processAndSendTicket = (ticket, res)=>{
    console.log(Array.isArray(ticket))
    if (!Array.isArray(ticket)){
        if (ticket != null) {
            res.status(200).json(ticket)
        }
    }else{
        res.status(200).json(ticket)
    }
}
let sendError = (err)=>{
    res.status(404).send({err: "could not process request"})
    console.log(err)
}

//get open ticket for inspector view OR get all ticket
router.get("/all-tickets/:inspectorId", (req, res)=>{
    console.log(req.params.inspectorId)
    db.Ticket.findOne({
        inspecterOpen : true,// ticket still open
        inspectorId : req.params.inspectorId,
        inspectDate : moment().format("MM/DD/YYYY")  
    })
    .then((openTicket)=>{
        processAndSendTicket(openTicket, res)
    })
    .catch((err)=> {
        sendError(err)
    })

    db.Ticket.find({
        assignedToInspector : false
    })
    .then((tickets)=>{
        processAndSendTicket(tickets, res)
    })
    .catch((err)=>{
        sendError(err);
    });

});

//get employee from cookie data
router.get("/getEmployee/:id", (req, res)=>{
    db.Employee.findById(req.params.id)
    .then((employee)=>{
        res.status(200).json({
            id : employee._id,
            fullname : employee.fullname
        })
    })
    .catch((err)=>{
        res.status(404).json({err: "no such employee"})
    })
})

//inspector dispatch job
router.put("/dispatchOne", (req, res)=>{
    console.log(req.body)
    console.log("=========")
    db.Ticket.findByIdAndUpdate(req.body.ticketId, {
        assignedToInspector : true,
        inspectorId : req.body.inspectorId,
        inspectStage: 1,
        inspectDate : moment().format("MM/DD/YYYY"),
        inspecterOpen : true
    })
    .then((updatedTicket)=>{
        console.log(updatedTicket)
    })
    res.send("okay");
})

module.exports = router