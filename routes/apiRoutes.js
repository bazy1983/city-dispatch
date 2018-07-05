const router = require("express").Router();
const db = require("../models");
const keys = require("../config/keys");
const request = require("request");

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

//get all tickets for inspector view
router.get("/all-tickets", (req, res)=>{
    db.Ticket.find({
        assignedToInspector : false
    })
    .then((tickets)=>{
        res.status(200).json(tickets)
    })
    .catch((err)=>{
        console.log(err)
        res.status(404).json({err: "something went wrong"})
    });
});

module.exports = router