const express = require('express');
const router = express.Router();
const {Serie, validateSerie} = require('../models/Serie');
const {User, validateUser} = require('../models/User');

router.get("/serie/:serieId", async (req, res) => {

    // Fetch a serie and populate the nested user models
    const serie = await Serie.findOne({
        serieId: req.params.serieId
    })
    .populate("players.user")
    .populate("playedMatches.winners.players")
    .populate("playedMatches.losers.players");

    //Update scoreboard (for testing purposes, this will happen in serie.add/remove/editMatch)
    serie.updateScoreBoard();

    res.send(serie);
});

router.get("/userSeries/:userId", async (req, res) => {

    const user = await User.findOne({
        userId: req.params.userId
    });

    let userSeries = [];
    for (let i = 0; i < user.series.length; i++) {
        const serie = await Serie.findOne({
            serieId: user.series[i]
        })
        .populate("players.user")
        .populate("playedMatches.winners.players")
        .populate("playedMatches.losers.players");
        
        userSeries.push(serie);
    }

    res.send(userSeries);
});

router.post("/createSerie", async (req, res) => {

    const newSerie = new Serie({
        serieId: req.body.serieId,
        name: req.body.name
    });

    newSerie.save((error, success) => {
        if (error){
            res.send(error.message)
        } else {
            res.send(newSerie)
        }
    });

});

router.post("/addPlayer", async (req, res) => {

    const playerToAdd = await User.findOne({
        userId: req.body.userId
    });

    const serie = await Serie.findOne({
        serieId: req.body.serieId
    }).populate("players.user");

    await serie.addPlayer(playerToAdd);
    await playerToAdd.addSerie(serie);

    res.send(serie);

});

router.post("/removePlayer", async (req, res) => {

    const playerToRemove = await User.findOne({
        userId: req.body.userId
    });

    const serie = await Serie.findOne({
        serieId: req.body.serieId
    }).populate("players.user");

    await serie.removePlayer(playerToRemove);
    await playerToRemove.removeSerie(serie);

    res.send(serie);

});

router.post("/addMatch", async (req, res) => {

    const winnerOne = await User.findOne({
        userId: req.body.winners[0]
    });
    const winnerTwo = await User.findOne({
        userId: req.body.winners[1]
    });
    const loserOne = await User.findOne({
        userId: req.body.losers[0]
    });
    const loserTwo = await User.findOne({
        userId: req.body.losers[1]
    });

    let winners = [winnerOne, winnerTwo];
    let losers = [loserOne, loserTwo];

    const winningGames = req.body.winningGames;
    const losingGames = req.body.losingGames;

    const serie = await Serie.findOne({
        serieId: req.body.serieId
    });

    let gameStats = {
        winners: winners,
        losers: losers,
        winningGames: winningGames,
        losingGames: losingGames
    }

    await serie.addMatch(gameStats);

    res.send("Match added: " + gameStats);

});


module.exports = router;