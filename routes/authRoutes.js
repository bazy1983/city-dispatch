const router = require("express").Router();
const db = require("../models");

module.exports = function (passport) {

    //USER AUTHENTICATION STARTS
    router.post("/signup", function (req, res) {
        // console.log(req.body)
        db.User.findOne({ username: req.body.username })
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

    router.post("/login", passport.authenticate("user", {
        failureRedirect: "/",
        // successRedirect: "/profile"
    }), function (req, res) {
        res.cookie("_acc", req.user.id)
        // console.log(res.cookie.toString())
        res.redirect("/profile")
        // res.send("hey")
    })

    router.get('/logout', function (req, res) {
        req.logout();
        res.status(200).end();
    });
    //USER AUTHENTICATION ENDS

    //EMPLOYEE AUTHENTICATION STARTS
    router.post("/inspect-signup", function (req, res) {
        // console.log(req.body)
        db.Employee.findOne({ username: req.body.username })
            .then(function (user) { //prevent dublicate username entries
                if (user) {
                    res.status(500).send({ err: "user exsists!" });
                } else {
                    var record = new db.Employee();
                    record.username = req.body.username;
                    record.fullname = req.body.fullname;
                    record.email = req.body.email;
                    record.password = record.hashPassword(req.body.password);
                    record.role = 10;
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

    router.post("/inspect-login", passport.authenticate("employee", {
        failureRedirect: "/inspect",
        // successRedirect: "/profile"
    }), function (req, res) {
        res.cookie("_acc", req.user.id)
        // console.log(res.cookie.toString())
        res.redirect("/inspector")
        
    })

    router.post("/work-login", passport.authenticate("employee", {
        failureRedirect: "/work",
        // successRedirect: "/profile"
    }), function (req, res) {
        res.cookie("_acc", req.user.id)
        // console.log(res.cookie.toString())
        res.redirect("/city-worker")
        
    })

    router.get('/authenticate-person',checkAuthentication,function(req,res){
        res.status(200).json({redirect : false});
    });
    function checkAuthentication(req,res,next){
        if(req.isAuthenticated()){
            // console.log("authenticated")
            //req.isAuthenticated() will return true if user is logged in
            next();
        } else{
            // console.log("not authenticated")
            res.json({redirect : "/"})
        }
    }


    return router;
};