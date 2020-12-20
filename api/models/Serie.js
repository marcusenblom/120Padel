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
        matchesPlayed: {
            type: Number,
            default: 0
        },
        matchesWon: {
            type: Number,
            default: 0
        },
        points: {
            type: Number,
            default: 0
        },
        gameWon: {
            type: Number,
            default: 0
        },
        gameLost: {
            type: Number,
            default: 0
        },
        pointsPerMatch: {
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
            gameWon: {
                type: Number,
                required: true
            }
        },
        losers: {
            players: [{
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            }],
            gameWon: {
                type: Number,
                required: true
            }
        }
    }]

});

// Function which updates scoreboard by clearing player data and loops through all games played and rebuild the scoring data
serieSchema.methods.updateScoreBoard = function(){

    let listOfPlayers = this.players;

    listOfPlayers.forEach(player => {
        // Clear all data from players
        player.matchesPlayed = 0;
        player.matchesWon = 0;
        player.points = 0;
        player.gameWon = 0;
        player.gameLost = 0;
    });

    this.playedMatches.forEach(match => {

        // How many game the winners won (consequently losers lost) and vice versa
        let winningGameWon = match.winners.gameWon;
        let losingGameWon = match.losers.gameWon;

        // How much each game won is worth. This will be added to the winners total points
        let winPoints = 2;

        match.winners.players.forEach(winnerOfMatch => {
            listOfPlayers.forEach(playerInSerie => {
                if (playerInSerie.user.userId == winnerOfMatch.userId) {
                    // Add games played, points, game won and game lost to winners
                    playerInSerie.points += winPoints;
                    playerInSerie.gameWon += winningGameWon;
                    playerInSerie.gameLost += losingGameWon;
                    playerInSerie.matchesPlayed += 1;
                    playerInSerie.matchesWon += 1;
                }
            });
        });

        match.losers.players.forEach(loserOfMatch => {
            listOfPlayers.forEach(playerInSerie => {
                if (playerInSerie.user.userId == loserOfMatch.userId) {
                    // Add games played, game won and loss to losers
                    playerInSerie.gameWon += losingGameWon;
                    playerInSerie.gameLost += winningGameWon;
                    playerInSerie.matchesPlayed += 1;
                }
            });
        });
    });
    // Game ppg
    this.players.forEach(player => {
        if (player.matchesPlayed > 0) {
            player.pointsPerMatch = (player.points/player.matchesPlayed);
        }
        else {
            player.pointsPerMatch = 0;
        }
    });

    // Rearragne based on ppg
    this.players.sort((a, b) => (a.pointsPerMatch < b.pointsPerMatch) ? 1 : -1)
    
    return this.save();
};

serieSchema.methods.addPlayer = function(user){

    let playerExistsInSerie = false;
    let listOfPlayers = this.players;
    
    listOfPlayers.forEach(player => {
        
        if (player.user.userId == user.userId) {
            playerExistsInSerie = true;
        }
    });
    if (!playerExistsInSerie) {
        // Add user to serie
        listOfPlayers.push({user: user});

    }

    return this.save();
};
serieSchema.methods.removePlayer = function(user){

    let listOfPlayers = this.players;
    
    listOfPlayers.forEach(function(player, index){

        if (player.user.userId == user.userId) {

            listOfPlayers.splice(index, 1);
        }
    });

    return this.save();
};

serieSchema.methods.addMatch = function(gameStats){

    let matchId = (this.playedMatches.length + 1);
    let newMatch = {
        matchId: matchId,
        winners: {
            players: gameStats.winners,
            gameWon: gameStats.winningGames
        },
        losers: {
            players: gameStats.losers,
            gameWon: gameStats.losingGames
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