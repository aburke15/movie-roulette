var express = require("express"); 
var movieRouter = express.Router(); 
var Movie = require("../models/movie");

movieRouter.route("/")
    .get(function(req, res) {
        Movie.find({user: req.user._id}, function(err, movies) {
            
        })
    })