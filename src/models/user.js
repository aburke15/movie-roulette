var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var bcrypt = require("bcrypt");

// user schema defined below 
var userSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    }
});

userSchema.pre("save", function(next) {
    var user = this;
    // checks to see if the password is new or 
    if (!user.isModified("password")) {
        return next();
    } else {
        // if the password is new hash the password
        bcrypt.hash(user.password, 10, function(err, hash) {
            if (err) return next(err);
            user.password = hash;
            next();
        });
    }
});

userSchema.methods.withoutPassword = function() {
    var user = this.toObject();
    delete user.password;
    return user;
}

module.exports = mongoose.model("User", userSchema);