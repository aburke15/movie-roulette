var mongoose = require("mongoose"); 
var Schema = mongoose.Schema; 
var bcrypt = require("bcrypt"); 

var userSchema = new Schema({
    firsName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    }, 
    email: {
        type: String, 
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

userSchema.pre("save", function(next) {
    var user = this;
    if (!user.isModified("password")) {
        return next(); 
    } else {
        bcrypt.hash(user.password, 10, function(err, hash) {
            if (err) return next(err); 
            user.password = hash; 
            next(); 
        });
    }
});

module.exports = mongoose.model("User", userSchema); 