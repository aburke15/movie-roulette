var express = require("express"); // pull in express to user the Router method
var authRouter = express.Router(); // declare and instantiate the Router method
var User = require("../models/user"); // pulls in the user schema 
var jwt = require("jsonwebtoken"); // produces a json web token 
var config = require("../config"); // pulls in the config file with the secret
var bcrypt = require("bcrypt"); // pulls in bcrypt to hash the user password    

authRouter.route("/login")
    .post(function(req, res) {
        User.findOne({
            // checks for the username in the database 
            username: req.body.username
        }, function(err, user) {
            if (err) res.status(500).send(err);
            if (!user) {
                res.status(401).send({
                    success: false,
                    message: "Provided username was not found!"
                });
            } else {
                // use bcrypt to compare the request body password with the user password
                bcrypt.compare(req.body.password, user.password, function(err, match) {
                    if (err) {
                        // if there is an error send status of 500
                        res.status(500).send(err);
                    } else if (!match) {
                        // if the password does not match send 401 status and message
                        res.status(401).send({
                            success: false,
                            message: "Incorrect password!"
                        });
                    } else {
                        // if password matches grant user a token for authentication
                        var token = jwt.sign(user._doc, config.secret);
                        res.send({
                            success: true,
                            user: user.withoutPassword(),
                            token: token,
                            message: "Token retrieved"
                        });
                    }
                });
            }
        });
    });

authRouter.route("/signup")
    // check to see if the username already exists
    .post(function(req, res) {
        User.findOne({
            username: req.body.username
        }, function(err, existingUser) {
            if (err) res.status(500).send(err);
            if (existingUser) res.send({
                success: false,
                message: "User name is already taken!"
            });
            else {
                // if the user name does not exist allow the user to add a new user
                var newUser = new User(req.body);
                newUser.save(function(err, user) {
                    if (err) res.status(500).send(err);
                    else res.send({
                        success: true,
                        user: user,
                        message: "Successfully created a new user."
                    });
                });
            }
        });
    });

module.exports = authRouter;