var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var bcrypt = require("bcrypt");
const SALT_WORK = 10;

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

    // checks to see if the password is new or modfied to hash
    if (!user.isModified("password")) return next();

    // generate the salt
    bcrypt.genSalt(SALT_WORK, function(err, salt) {
        if (err) return next(err);

        // hash the password incorporating new salt
        bcrypt.hash(salt, function(err, hash) {
            if (err) return next(err);

            // change the cleartext password to the hashed password
            user.password = hash;
            next();
        });
    });
});

userSchema.methods.withoutPassword = function() {
    var user = this.toObject();
    delete user.password;
    return user;
}

module.exports = mongoose.model("User", userSchema);