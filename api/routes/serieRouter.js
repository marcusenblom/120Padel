const express = require('express');
const router = express.Router();
const {Serie, validateSerie} = require('../models/Serie');
const {User, validateUser} = require('../models/User');

router.get("/series", async (req, res) => {

    const series = await Serie.find().populate("players.user");
    res.send(series);

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
    console.log(playerToAdd);

    const serie = await Serie.findOne({
        serieId: req.body.serieId
    }).populate("players.user");
    console.log(serie);

    await serie.addPlayer(playerToAdd);

    res.send(serie);

});


module.exports = router;