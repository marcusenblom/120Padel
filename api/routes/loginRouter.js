const express = require('express');
const router = express.Router();
const {User, validateUser} = require('../models/User');

router.get("/login", async (req, res) => {
    res.send("Här loggar du in");
});

router.post("/login", async (req, res) => {
    
    // Skicka inloggningsuppgifter och verifiera

});

module.exports = router;