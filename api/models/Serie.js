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
    }],
    playedMatches: [{
        matchId: {
            type: Number,
            required: true
        },
        serie: {
            type: Number,
            default: this.serieId
        },
        winners: {
            players: [{
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            }],
            setWon: {
                type: Number,
                required: true
            }
        },
        losers: {
            players: [{
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            }],
            setWon: {
                type: Number,
                required: true
            }
        }
    }]

});

serieSchema.methods.updateScoreBoard = function(){

    this.players.forEach(player => {
        // Clear all data from players
        player.gamesPlayed = 0;
        player.points = 0;
        player.setWon = 0;
        player.setLost = 0;
    });

    this.playedMatches.forEach(match => {

        // How many set the winners won (consequently losers lost) and vice versa
        let winningSetWon = match.winners.setWon;
        let losingSetWon = match.losers.setWon;

        // How much each game won is worth. This will be added to the winners total points
        let winPoints = 2;

        match.winners.players.forEach(winnerOfMatch => {
            this.players.forEach(playerInSerie => {
                if (playerInSerie.user.userId == winnerOfMatch.userId) {
                    // Add games played, points, set won and set lost to winners
                    playerInSerie.points += winPoints;
                    playerInSerie.setWon += winningSetWon;
                    playerInSerie.setLost += losingSetWon;
                    playerInSerie.gamesPlayed += 1;
                }
            });
        });

        match.losers.players.forEach(loserOfMatch => {
            this.players.forEach(playerInSerie => {
                if (playerInSerie.user.userId == loserOfMatch.userId) {
                    // Add games played, set won and loss to losers
                    playerInSerie.setWon += losingSetWon;
                    playerInSerie.setLost += winningSetWon;
                    playerInSerie.gamesPlayed += 1;
                }
            });
        });

    });
    return this.save();
};

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

serieSchema.methods.addMatch = function(gameStats){

    let matchId = (this.playedMatches.length + 1);
    let newMatch = {
        matchId: matchId,
        winners: {
            players: gameStats.winners,
            setWon: gameStats.winningSets
        },
        losers: {
            players: gameStats.losers,
            setWon: gameStats.losingSets
        }
    };

    this.playedMatches.push(newMatch);

    this.updateScoreBoard();

    
};





const Serie = mongoose.model("Serie", serieSchema);

function validateSerie(serie) {
    const schema = {
        serieId: joi.number().unique().required(),
        name: joi.string().min(1).max(100).required(),
    }

    return joi.validate(serie, schema);
}

module.exports.Serie = Serie;
module.exports.validateSerie = validateSerie;