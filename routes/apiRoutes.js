const router = require("express").Router();
const db = require("../models");
const keys = "6c19e66fe2921d2b074b34768fb253b6"
const request = require("request");
const moment = require ("moment");

function today () {
    let todayDate = new Date;
    let thisDay = todayDate.getDate()
    let thisMonth = todayDate.getMonth();
    let thisYear = todayDate.getFullYear();
        return {
        firstDay : 1,
        thisDay : thisDay,
        thisMonth : thisMonth,
        thisYear : thisYear
    }    
}


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
    let dateInfo = today();
    db.Ticket.findOne({
        inspecterOpen : true,// ticket still open
        inspectorId : req.params.inspectorId,
        inspectDate : {$gte : new Date(dateInfo.thisYear, dateInfo.thisMonth, dateInfo.thisDay)}
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
                console.log(err)
                res.status(404).json({err: "some err"});
            });
        }
    })
    .catch((err)=> { //catch for findOne
        console.log(err)
        res.status(404).json({err: "some err"})
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
        inspectDate : new Date,
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
    if(req.query.flowFor === "1"){
        db.Ticket.findOneAndUpdate({_id :req.query.id}, {
            inspectStage : req.query.stepNumber
        })
        .then((data)=>{
            // console.log(data)
        })
    } else {
        db.Ticket.findOneAndUpdate({_id :req.query.id}, {
            dispatchStage : req.query.stepNumber
        })
        .then((data)=>{
            // console.log(data)
        })
    }
})

//employee close out ticket
router.put("/closeTicket", (req, res)=>{
    // console.log("hitting close")
    console.log(req.body)
    if (req.body.employee === 1 ){
        db.Ticket.findByIdAndUpdate(req.body.id, {
            approved : true,
            dispatchable : true,
            inspecterOpen: false,
            inspectClose : new Date
        })
        .then(()=>{
            //ADD USER REWARDS
        })
    } else if (req.body.employee === 2){
        // console.log("city worker is trying to close out")
        db.Ticket.findOneAndUpdate({_id : req.body.id}, {
            closed : true,
            dispatchable : false
        })
        .then((job) => {
            //update user
            // console.log(job)
        })
    }
    res.send("okay")
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

//city worker get one job
router.get("/getOneJob/:employeeId", (req, res)=>{
    // console.log(req.params.employeeId)
    db.Ticket.findOneAndUpdate({
        dispatchable : true,
        dispatched : false,
        closed : false
    }, {
        teamId : req.params.employeeId,
        dispatched: true,
        dispatchDate : moment().format("MM/DD/YYYY")
    })
    .then((job)=>{
        if(job){
            res.status(200).json(job);
        } else {
            res.json({job : "There are no more jobs available in the pool"})
        }
    })
    .catch((err)=>{
        console.log(err);
        res.status(404).json({err: "no more jobs to dispatch"})
    })
})

router.get("/check-dispatch/:id", (req, res)=>{
    // console.log(req.params.id)
    db.Ticket.findOne({
        teamId: req.params.id,
        closed : false
    })
    .then ((job)=>{
        console.log(job)
        if(job !== null){
            // console.log("found open job!")
            res.json(job)
        } else {
            // console.log("on open jobs found!")
            db.Ticket.find({
                teamId : req.params.id,
                closed : true,
                dispatchDate : moment().format("MM/DD/YYYY")
            })
            .then ((closeJobsOfTheDay) => {
                res.json(closeJobsOfTheDay);
            })
        }
    })
    .catch((err)=>{
        console.log(err)
        res.status(404).json({err: "some err!!"})
    })
})

router.get("/tickets-per-month", (req, res) => {
    let dateInfo = today();
    db.Ticket.find({
        createdAt : { $gte : new Date(dateInfo.thisYear, dateInfo.thisMonth, dateInfo.firstDay)}
    })
    .then((tickets) => {
        res.json({count : tickets.length})
    })
})

router.get("/inspected-per-month", (req, res) => {
    let dateInfo = today();
    db.Ticket.find({
        inspectClose : { $gte : new Date(dateInfo.thisYear, dateInfo.thisMonth, dateInfo.firstDay)},
        assignedToInspector : true
    })
    .then((tickets) => {
        res.json({count : tickets.length})
    })
})

module.exports = router