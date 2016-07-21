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

movieRouter.route("/:id")
    .get(function(req, res) {
        Movie.findOne({_id: req.params.id, user: req.user._id}, {new: true}, function (err, movie) {
            if (err) res.status(500).send(err); 
            else res.send(movie); 
        });
    })
    .put(function(req, res) {
        Movie.findOneAndUpdate({_id: req.params.id, user: req.user._id}, req.body, {new: true}, function(err, movie) {
            if (err) res.status(500).send(err); 
            else res.send(movie); 
        });
    })
    .delete(function(req, res) {
        Movie.findOneAndRemove({_id: req.params.id, user: req.user._id}, function(err, movie) {
            if (err) res.status(500).send(err);
            else var response = {
                movie: movie,
                message: "Movie was successfully deleted!"
            }
            res.send(response); 
        });
    });

module.exports = movieRouter; 