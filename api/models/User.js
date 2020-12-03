const mongoose = require('mongoose');
const joi = require("joi");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    userId: {
        type: Number,
        unique: true,
        required: true
    },
    firstName: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 100
    },
    lastName: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 100
    },
    email: {
        type: String,
        required: true,
        unique: true,
        minlength: 2,
        maxlength: 100
    },
    password: {
        type: String,
        required: true,
        maxlength: 100
    }
});


const User = mongoose.model("User", userSchema);


function validateUser(user) {
    const schema = {
        userId: joi.number().unique().required(),
        firstName: joi.string().min(1).max(100).required(),
        lastName: joi.string().min(1).max(100).required(),
        email: joi.string().min(2).max(100).required().email(),
        password: joi.string().max(100).required()
    }

    return joi.validate(user, schema);
}

module.exports.User = User;
module.exports.validateUser = validateUser;