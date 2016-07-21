var express = require("express");
var authRouter = express.Router();
var User = require("../models/user");
var jwt = require("jsonwebtoken");
var config = require("../config");
var bcrypt = require("bcrypt");

authRouter.route("/login")
    .post(function (req, res) {
        User.findOne({
            username: req.body.username
        }, function (err, user) {
            if (err) res.status(500).send(err);
            if (!user) {
                res.status(401).send({
                    success: false,
                    message: "Provided username was not found!"
                });
            } else {
                bcrypt.compare(req.body.password, user.password, function (err, match) {
                    if (err) {
                        res.status(500).send(err);
                    } else if (!match) {
                        res.status(401).send({
                            success: false,
                            message: "Incorrect password!"
                        });
                    } else {
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
    .post(function (req, res) {
        User.findOne({
            username: req.body.username
        }, function (err, existingUser) {
            if (err) res.status(500).send(err);
            if (existingUser) res.send({
                success: false,
                message: "User name is already taken!"
            });
            else {
                var newUser = new User(req.body);
                newUser.save(function (err, user) {
                    if (err) res.status(500).send(err);
                    else res.send({
                        success: true,
                        user: user,
                        message: "Successfully created new user"
                    });
                });
            }
        });
    });

module.exports = authRouter;