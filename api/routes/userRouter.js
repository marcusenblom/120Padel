const express = require('express');
const router = express.Router();
const {User, validateUser} = require('../models/User');

router.get("/login", async (req, res) => {

});

router.post("/login", async (req, res) => {

});

router.post("/createUser", async (req, res) => {

    const newUser = new User({
        userId: req.body.userId,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        address: {
            street: req.body.street,
            zip: req.body.zip,
            city: req.body.city
        }
    });

    await newUser.save((error, success) => {
        if (error){
            res.send(error.message)
        } else {
            res.send(newUser)
        }
    });

});


module.exports = router;