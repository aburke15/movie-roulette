var express = require("express"); 
var movieRouter = express.Router(); 
var Movie = require("../models/movie");

movieRouter.route("/")
    .get(function(req, res) {
        Movie.find({user: req.user._id}, function(err, movies) {
            if (err) res.status(500).send(err);
            else res.send(movies); 
        });
    })
    .post(function(req, res) {
        var newMovie = Movie(req.body); 
        newMovie.user = req.user._id;
    
        newMovie.save(function (err, movie) {
            if (err) res.status(500).send(err);
            else res.status(201).send(movie);
        });
    });


module.exports = movieRouter; 