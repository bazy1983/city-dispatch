var express = require('express');
var router = express.Router();

var loggedin = function(req, res, next) {
  if (req.isAuthenticated()){
    next()
  } else {
    res.redirect("/login")
  }
}



router.get('/login', function(req, res, next) {
  // res.render('login');
  res.json({err : "bad entry!"})
});

router.get('/signup', function(req, res, next) {
  // res.render('signup');
});

router.get("/profile", loggedin, function(req, res, next) {
  res.send(req.session)
})

router.get("/logout", function( req, res) {
  req.logout();
  // res.redirect("/");
})

module.exports = router;
