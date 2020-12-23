const express = require('express');
const router = express.Router();
const {User, validateUser} = require('../models/User');

router.get("/login", async (req, res) => {
    res.send("Här loggar du in");
});

router.post("/login", async (req, res) => {
    
    let userName = req.body.userName;
    let password = req.body.password;
    
    // Skicka inloggningsuppgifter och verifiera. Om de stämmer, tillåt användaren att logga in.

});

module.exports = router;