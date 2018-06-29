const router = require("express").Router();
const db = require("../models");

module.exports = function (passport) {

    router.post("/signup", function (req, res) {
        // console.log(req.body)
        User.findOne({ username: req.body.username })
            .then(function (user) { //prevent dublicate username entries
                if (user) {
                    res.status(500).send({ err: "user exsists!" });
                } else {
                    var record = new db.User();
                    record.username = req.body.username;
                    record.fullname = req.body.fullname;
                    record.email = req.body.email;
                    record.password = record.hashPassword(req.body.password);
                    record.save(function (err, user) {
                        if (err) { res.status(500).send({ err: "db error" }) }
                        else { res.send(user) }
                    })
                }
            })
            .catch(function (err) {
                res.status(500).send({ err: "some error!!" });
            })
    })

    router.post("/login", passport.authenticate("local", {
        failureRedirect: "/",
        // successRedirect: "/profile"
    }), function (req, res) {
        res.redirect("/profile#" + req.user.id)
        // res.send("hey")
    })



    return router;
};