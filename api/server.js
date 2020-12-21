const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require("dotenv").config();
const db = require("./config/config").databaseURI;
const cors = require("cors");

const homeRouter = require('./routes/homeRouter');
const userRouter = require('./routes/userRouter');
const serieRouter = require('./routes/serieRouter');
const loginRouter = require('./routes/loginRouter');



const app = express();
app.use(cors());

// Body-parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Use routes
app.use(
    homeRouter,
    userRouter,
    serieRouter,
    loginRouter
);





// Connect to MongoDB
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true
};

mongoose
    .connect(db, options)
    .then(()=> console.log('MongoDB Connected...'))
    .catch(err => console.log(err));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))