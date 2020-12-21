const express = require('express');
const router = express.Router();
const {User, validateUser} = require('../models/User');

router.get("/profile", async (req, res) => {

    res.send()
});

router.get("/allUsers", async (req, res) =>{
    const allUsers = await User.find();
    res.send(allUsers);
});

router.post("/createUser", async (req, res) => {

    const newUser = new User({
        userId: req.body.userId,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        userName: req.body.userName,
        password: req.body.password
    });

    newUser.save((error, success) => {
        if (error){
            res.send(error.message)
        } else {
            res.send(newUser)
        }
    });

});


module.exports = router;