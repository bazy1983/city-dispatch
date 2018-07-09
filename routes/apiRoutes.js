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

// // function handle what ticket to send
// let processAndSendTicket = (ticket, res)=>{
//     console.log(Array.isArray(ticket))
//     if (!Array.isArray(ticket)){
//         if (ticket != null) {
//             res.status(200).json(ticket)
//         }
//     }else{
//         res.status(200).json(ticket)
//     }
// }
// let sendError = (err)=>{
//     res.status(404).send({err: "could not process request"})
//     console.log(err)
// }

//get open ticket for inspector view OR get all ticket
router.get("/all-tickets/:inspectorId", (req, res)=>{
    db.Ticket.findOne({
        inspecterOpen : true,// ticket still open
        inspectorId : req.params.inspectorId,
        inspectDate : moment().format("MM/DD/YYYY")  
    })
    .then((openTicket)=>{
        // if open ticket is found
        if(openTicket){

            res.status(200).json(openTicket)
        } else {

            db.Ticket.find({
                assignedToInspector : false
            })
            .then((tickets)=>{
                res.status(200).json(tickets)
            })
            .catch((err)=>{
                sendError(err);
            });
        }
    })
    .catch((err)=> { //catch for findOne
        sendError(err)
    })

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
    db.Ticket.findByIdAndUpdate(req.body.ticketId, {
        assignedToInspector : true,
        inspectorId : req.body.inspectorId,
        inspectStage: 1,
        inspectDate : moment().format("MM/DD/YYYY"),
        inspecterOpen : true
    })
    .then((updatedTicket)=>{
        // console.log(updatedTicket)
        res.send("okay");
    })
})

//get current instructions for dispatched job
router.get("/stage", (req, res)=>{
    // console.log(req.query)
    db.Workflow.findOne({
        flowFor : req.query.flowFor,
        stepNumber : req.query.stepNumber
    })
    .then((instructions)=>{
        // console.log(instructions)
        res.status(200).json(instructions)
    })
    .catch((err)=>{
        console.log(err);
        res.status(404).end()
    })
    db.Ticket.findByIdAndUpdate(req.query.id, {
        inspectStage : req.query.stepNumber
    })
    .then((data)=>{
        // console.log(data)
    })
})

//inspector close out ticket
router.put("/closeTicket", (req, res)=>{
    if (req.body.employee === 1 ){
        db.Ticket.findByIdAndUpdate(req.body.id, {
            approved : true,
            dispatchable : true,
            inspecterOpen: false
        })
        .then(()=>{
            res.send("okay")
            //ADD USER REWARDS
        })
    }
})

router.put("/dismiss-ticket", (req, res)=>{
    db.Ticket.findByIdAndUpdate(req.body.id, {
        approved : false,
        dispatchable : false,
        inspecterOpen: false
    })
    .then(()=>{
        res.send("okay")
        //punish user!!
    })
})

router.put("/narratives", (req,res)=>{
    db.Ticket.findByIdAndUpdate(req.body.id, {
        inspectNarratives : req.body.notes
    })
    .then((ticket)=>{
        res.status(200).end();
    })
})

module.exports = router