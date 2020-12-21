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
    userName: {
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
    },
    series: [{
        serieId: {
            type: Number,
            required: true,
            unique: true
        },
        favoriteSerie: {
            type: Boolean
        }

    }],
});


// Add serie to user
userSchema.methods.addSerie = function(serie){

    let listOfSeries = this.series;
    let alreadyExists = false;

    let serieData = {
        serieId: serie.serieId,
        favoriteSerie: false
    };

    listOfSeries.forEach(userSerie => {
        if (userSerie.serieId == serie.serieId) {
            alreadyExists = true;
        }
    });
    // Add serie to user
    if (!alreadyExists) {
        listOfSeries.push(serieData);
    }

    this.save();
};

// Remove serie from user
userSchema.methods.removeSerie = function(serie){

    let listOfSeries = this.series;

    // Remove serie from user
    listOfSeries.forEach(function(serieId, index){
        if (serieId == serie.serieId) {

            listOfSeries.splice(index, 1);
        }
    });

    this.save();
};


const User = mongoose.model("User", userSchema);


function validateUser(user) {
    const schema = {
        userId: joi.number().unique().required(),
        firstName: joi.string().min(1).max(100).required(),
        lastName: joi.string().min(1).max(100).required(),
        userName: joi.string().min(2).max(100).required().unique(),
        password: joi.string().max(100).required()
    }

    return joi.validate(user, schema);
}

module.exports.User = User;
module.exports.validateUser = validateUser;