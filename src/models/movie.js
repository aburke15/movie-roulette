var mongoose = require("mongoose"); 
var Schema = mongoose.Schema; 

var movieSchema = new Schema({
    title: {
        type: String,
        required: false 
    },
    rating: {
        type: Number,
        required: false
    },
    original_language: {
        type: String
    }
});

module.exports = mongoose.model("Movie", movieSchema);