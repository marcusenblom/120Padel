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
        userId: req.body.winnerOne
    });
    const winnerTwo = await User.findOne({
        userId: req.body.winnerTwo
    });
    const loserOne = await User.findOne({
        userId: req.body.loserOne
    });
    const loserTwo = await User.findOne({
        userId: req.body.loserTwo
    });

    let winners = [winnerOne, winnerTwo];
    let losers = [loserOne, loserTwo];

    const winningSets = req.body.winningSets;
    const losingSets = req.body.losingSets;

    const serie = await Serie.findOne({
        serieId: req.body.serieId
    });

    let gameStats = {
        winners: winners,
        losers: losers,
        winningSets: winningSets,
        losingSets: losingSets
    }

    await serie.addMatch(gameStats);

    res.send(serie);

});


module.exports = router;