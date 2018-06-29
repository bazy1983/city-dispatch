const router = require("express").Router();
const db = require("../models")

router.get("/getUser/:id", (req, res)=>{
    // console.log(req.params.id)
    db.User.findById(req.params.id)
    .then((user)=>{
        let {username, fullname, points, email, _id} = user //destructuring user object
        res.json({
            username : username,
            fullname : fullname,
            points : points,
            email : email,
            id : _id
        })  
    })
    .catch((err)=>{
        res.status(404).json({err: "no user found"})
    })
})

module.exports = router