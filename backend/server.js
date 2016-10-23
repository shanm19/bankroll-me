var express = require('express');
var cors = require('cors');
var logger = require('morgan');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

//Route require
var userRoute = require('./routes/userRoute');
var signInRoute = require('./routes/signInRoute');
var findRoute = require('./routes/findRoute');
var app = express();

mongoose.connect('mongodb://localhost/bankroll', function () {
    console.log("Mongoose a go-go!");
});

//Middleware
app.use(cors());
app.use(logger("dev"));
app.use(bodyParser.json());
//app.use(express.static(pathRoute.join(__dirname, "..", "frontend")));

//Routes
app.use("/users", userRoute);
app.use("/signin", signInRoute);
app.use("/find", findRoute);

app.listen(8080, function () {
    console.log("All's good on the 8080!");
});