const router = require("express").Router();
const db = require("../models");
const keys = "6c19e66fe2921d2b074b34768fb253b6"
const request = require("request");
const moment = require("moment");

function today() {
    let todayDate = new Date;
    let thisDay = todayDate.getDate()
    let thisMonth = todayDate.getMonth();
    let thisYear = todayDate.getFullYear();
    return {
        firstDay: 1,
        thisDay: thisDay,
        thisMonth: thisMonth,
        thisYear: thisYear
    }
}


router.get("/getUser/:id", (req, res) => {
    // console.log(req.params.id)
    db.User.findById(req.params.id)
        .then((user) => {

            res.json({
                username: user.username,
                fullname: user.fullname,
                points: user.points,
                email: user.email,
                id: user._id,
                notify : user.notify,
                text : user.notifyText,
                notifyTicket : user.notifyTicket
            })
        })
        .catch((err) => {
            res.status(404).json({ err: "no user found" })
        })
})

//get weather information
router.get("/getWeather/:lat/:log", (req, res) => {
    // console.log(req.params)
    let URI = "https://api.openweathermap.org/data/2.5/forecast?";
    let key = "&appid=" + keys;
    let coord = `lat=${req.params.lat}&lon=${req.params.log}`
    let units = "&units=imperial"
    request(URI + coord + key + units, (err, response, body) => {
        if (err) console.log(err);
        body = JSON.parse(body)
        // console.log(body);
        res.json(body)
    })
})


//get open ticket for inspector view OR get all ticket
router.get("/all-tickets/:inspectorId", (req, res) => {
    let dateInfo = today();
    db.Ticket.findOne({
        inspecterOpen: true,// ticket still open
        inspectorId: req.params.inspectorId,
        inspectDate: { $gte: new Date(dateInfo.thisYear, dateInfo.thisMonth, dateInfo.thisDay) }
    })
        .then((openTicket) => {
            // if open ticket is found
            if (openTicket) {

                res.status(200).json(openTicket)
            } else {

                db.Ticket.find({
                    assignedToInspector: false
                })
                    .then((tickets) => {
                        res.status(200).json(tickets)
                    })
                    .catch((err) => {
                        console.log(err)
                        res.status(404).json({ err: "some err" });
                    });
            }
        })
        .catch((err) => { //catch for findOne
            console.log(err)
            res.status(404).json({ err: "some err" })
        })

});

//get employee from cookie data
router.get("/getEmployee/:id", (req, res) => {
    db.Employee.findById(req.params.id)
        .then((employee) => {
            res.status(200).json({
                id: employee._id,
                fullname: employee.fullname
            })
        })
        .catch((err) => {
            res.status(404).json({ err: "no such employee" })
        })
})

//inspector dispatch job
router.put("/dispatchOne", (req, res) => {
    db.Ticket.findByIdAndUpdate(req.body.ticketId, {
        assignedToInspector: true,
        inspectorId: req.body.inspectorId,
        inspectStage: 1,
        inspectDate: new Date,
        inspecterOpen: true
    })
        .then((updatedTicket) => {
            // console.log(updatedTicket)
            res.send("okay");
        })
})

//get current instructions for dispatched job
router.get("/stage", (req, res) => {
    // console.log(req.query)
    db.Workflow.findOne({
        flowFor: req.query.flowFor,
        stepNumber: req.query.stepNumber
    })
        .then((instructions) => {
            // console.log(instructions)
            res.status(200).json(instructions)
        })
        .catch((err) => {
            console.log(err);
            res.status(404).end()
        })
    if (req.query.flowFor === "1") {
        db.Ticket.findOneAndUpdate({ _id: req.query.id }, {
            inspectStage: req.query.stepNumber
        })
            .then((data) => {
                // console.log(data)
            })
    } else {
        db.Ticket.findOneAndUpdate({ _id: req.query.id }, {
            dispatchStage: req.query.stepNumber
        })
            .then((data) => {
                // console.log(data)
            })
    }
})

//employee close out ticket
router.put("/closeTicket", (req, res) => {
    // console.log("hitting close")
    // console.log(req.body)
    if (req.body.employee === 1) {
        db.Ticket.findByIdAndUpdate(req.body.ticketId, {
            approved: true,
            dispatchable: true,
            inspecterOpen: false,
            inspectClose: new Date
        })
            .then((ticket) => {
                //ADD USER REWARDS
                console.log("should reward user")
                db.User.findOneAndUpdate({_id : ticket.userId},{
                    $inc : {points : 50 },
                    notify : true,
                    notifyText : "Your Ticket is Approved, you got 50 points..",
                    notifyTicket : ticket._id
                })
                .then(()=>{
                    console.log("added notification")
                })
            })
    } else if (req.body.employee === 2) {

        db.Ticket.findOneAndUpdate({
            _id: req.body.ticketId
        }, {
                closed: true,
                dispatchable: false,
                dispatchClose: new Date
            }, {
                new: true
            })
            .then((job) => {
                //update user
                db.User.findOneAndUpdate({_id : job.userId},{
                    notify : true,
                    notifyText : "Your Ticket is completed",
                    notifyTicket : job._id
                })
                // console.log(job)
                let before = new moment(job.dispatchDate);
                let after = new moment(job.dispatchClose);
                let duration = moment.duration(after.diff(before));
                let hours = duration.asHours().toFixed(2);
                hours = parseFloat(hours);
                db.Ticket.findOneAndUpdate({ _id: req.body.ticketId }, {
                    dispatchDuration: hours
                })
                .then((updated)=>{console.log(updated)})
                .catch((err)=>{console.log(err)})
                
            })
    }
    res.send("okay")
})

router.put("/dismiss-ticket", (req, res) => {
    db.Ticket.findByIdAndUpdate(req.body.id, {
        approved: false,
        dispatchable: false,
        inspecterOpen: false
    })
        .then((ticket) => {
            res.send("okay")
            //punish user!!
            db.User.findOneAndUpdate({_id : ticket.userId},{
                $inc : {points : 50 },
                notify : true,
                notifyText : "Your Ticket is denied, you lost 50 points..",
                notifyTicket : ticket._id
            })
        })
})

router.put("/narratives", (req, res) => {
    db.Ticket.findByIdAndUpdate(req.body.id, {
        inspectNarratives: req.body.notes
    })
        .then((ticket) => {
            res.status(200).end();
        })
})

//city worker get one job
router.get("/getOneJob/:employeeId", (req, res) => {
    // console.log(req.params.employeeId)
    db.Ticket.findOneAndUpdate({
        dispatchable: true,
        dispatched: false,
        closed: false
    }, {
            teamId: req.params.employeeId,
            dispatched: true,
            dispatchDate: new Date
        })
        .then((job) => {
            if (job) {
                res.status(200).json(job);
            } else {
                res.json({ job: "There are no more jobs available in the pool" })
            }
        })
        .catch((err) => {
            console.log(err);
            res.status(404).json({ err: "no more jobs to dispatch" })
        })
})

router.get("/check-dispatch/:id", (req, res) => { //serves open ticket. if not, get closed tickets
    let dateInfo = today();
    // find open ticket 
    db.Ticket.findOne({
        teamId: req.params.id,
        closed: false
    })
        .then((job) => {
            // console.log(job)
            if (job !== null) {
                // console.log("found open job!")
                res.json(job)
            } else {
                // find all jobs that were closed today
                db.Ticket.find({
                    teamId: req.params.id,
                    closed: true,
                    dispatchDate: { $gte: new Date(dateInfo.thisYear, dateInfo.thisMonth, dateInfo.thisDay) }
                })
                    .then((closeJobsOfTheDay) => {
                        res.json(closeJobsOfTheDay);
                    })
            }
        })
        .catch((err) => {
            console.log(err)
            res.status(404).json({ err: "some err!!" })
        })
})

router.get("/tickets-per-month", (req, res) => {
    let dateInfo = today();
    db.Ticket.find({
        createdAt: { $gte: new Date(dateInfo.thisYear, dateInfo.thisMonth, dateInfo.firstDay) }
    })
        .then((tickets) => {
            res.json({ count: tickets.length })
        })
})

router.get("/inspected-per-month", (req, res) => {
    let dateInfo = today();
    db.Ticket.find({
        inspectClose: { $gte: new Date(dateInfo.thisYear, dateInfo.thisMonth, dateInfo.firstDay) },
        assignedToInspector: true
    })
        .then((tickets) => {
            res.json({ count: tickets.length })
        })
})

module.exports = router