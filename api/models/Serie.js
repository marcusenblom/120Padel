const mongoose = require('mongoose');
const joi = require("joi");
const Schema = mongoose.Schema;

const serieSchema = new Schema({

    serieId: {
        type: Number,
        unique: true,
        required: true
    },
    name: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 100
    },
    players: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        gamesPlayed: {
            type: Number,
            default: 0
        },
        points: {
            type: Number,
            default: 0
        },
        setWon: {
            type: Number,
            default: 0
        },
        setLost: {
            type: Number,
            default: 0
        }
    }]
    // ,
    // gamesPlayed: [{

    // }]

});

serieSchema.methods.addPlayer = function(user){

    let playerExists = false;
    
    this.players.forEach(player => {
        if (player.user.userId == user.userId) {
            playerExists = true;
        }
    });
    if (!playerExists) {
        this.players.push({user: user});
    }

    return this.save();

};

// serieSchema.methods.addGame = function(){

//     this.gamesPlayed.push();
    
//     return this.save();

// };







const Serie = mongoose.model("Serie", serieSchema);


function validateSerie(serie) {
    const schema = {
        serieId: joi.number().unique().required(),
        name: joi.string().min(1).max(100).required(),
        // players: joi.string().min(1).max(100).required(),
    }

    return joi.validate(serie, schema);
}

module.exports.Serie = Serie;
module.exports.validateSerie = validateSerie;