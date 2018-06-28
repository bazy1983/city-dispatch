var passport = require("passport");
var localStrategy = require("passport-local").Strategy;
var db = require("../models");

module.exports = function(passport) {
    passport.serializeUser(function(user, done){
        done(null, user)
    });
    passport.deserializeUser(function(user, done){
        done(null, user)
    });

    passport.use(new localStrategy(function(username, password, done){
        db.User.findOne({
            username : username,
        })
        .then(function(user){
            if(user){
                var valid = user.comparePassword(password, user.password);
                if(valid) {
                    //valid password
                    done(null, {
                        id : user._id,
                        username: user.username,
                        fullname : user.fullname,
                        points : user.points
                        // password: user.password
                    })
                }else {
                    //invalid password
                    done(null, false)
                }
            } else {
                //user not found
                done(null, false);
            }
        })
        .catch(function(err){
            done(err);
        })
    }))
}
