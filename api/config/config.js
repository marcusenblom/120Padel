require("dotenv").config();

const config = {
    databaseURI:process.env.DATABASE,
}

module.exports = config;