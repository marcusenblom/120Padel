const express = require('express');
const { Serie } = require('../models/Serie');
const router = express.Router();
const {User, validateUser} = require('../models/User');

// Hard coded user as of now and until login-functionality is done
router.get("/", async (req, res) => {
    const user = await User.findOne({
        // userId: req.params.userId
        userId: 1
    }).populate("series.serie");

    res.send(user);
});

module.exports = router;