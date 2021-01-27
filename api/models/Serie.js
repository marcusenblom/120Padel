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
        standing: {
            type: Number,
            default: 0
        },
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
        date: {
            type: Date,
            required: true
        },
        matchId: {
            type: Number,
            required: true
        },
        serie: {
            type: Number,
            required: true
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

        match.winners.players.forEach(winner => {
            let player = listOfPlayers.find(player => player.user.userId === winner.userId);
            if (player !== undefined) {
                player.points += winPoints;
                player.gameWon += winningGameWon;
                player.gameLost += losingGameWon;
                player.matchesPlayed += 1;
                player.matchesWon += 1;
            } else {
                console.log("found undefined: " + winner.userId);
            }
        });
        match.losers.players.forEach(loser => {
            let player = listOfPlayers.find(player => player.user.userId === loser.userId);
            if (player !== undefined) {
                player.gameWon += winningGameWon;
                player.gameLost += losingGameWon;
                player.matchesPlayed += 1;
            } else {
                console.log("found undefined: " + loser.userId);
            }
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
    // this.players.sort((a, b) => (a.pointsPerMatch < b.pointsPerMatch) ? 1 : -1);
    this.players.sort(function(a,b){
        return a['pointsPerMatch']>b['pointsPerMatch']?-1:(a['pointsPerMatch']<b['pointsPerMatch']?1:(a[('gameWon')-('gameLost')]>b[('gameWon')-('gameLost')]?1:-1));
    });
    this.players.forEach(function(player, i){
        player.standing = i + 1;
    });
    
    return this.save();
};

// Add player to serie
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

// Remove player from serie
serieSchema.methods.removePlayer = function(user){

    let listOfPlayers = this.players;
    
    listOfPlayers.forEach(function(player, index){

        if (player.user.userId == user.userId) {

            listOfPlayers.splice(index, 1);
        }
    });

    return this.save();
};

// Register match to serie
serieSchema.methods.addMatch = function(gameStats){

    // Set matchID
    let matchId;
    if (this.playedMatches.length < 1) {
        matchId = 1;
    } else {
        let lastGameId = this.playedMatches.sort((a, b) => (a.matchId < b.matchId) ? 1 : -1)[0].matchId;
        matchId = lastGameId+1;
    }
    
    // Populate match object with data from post request
    let newMatch = {
        date: gameStats.date,
        matchId: matchId,
        serie: gameStats.serie,
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
    // Sort games by date
    this.playedMatches.sort((a, b) => (a.date < b.date) ? 1 : -1)

    return this.save();
};

// Change serie name
serieSchema.methods.changeName = function(newName){

    if (newName.length > 0) {
        this.name = newName;
    }

    return this.save();

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