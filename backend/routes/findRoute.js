var express = require('express');
var userRoute = express.Router();
var User = require('../schemas/userSchema');
var Desire = require('../schemas/desireSchema');

userRoute.route("/")
    .get(function (req, res) {
        User.find({
                firstName: req.query.name
            })
            .populate("wants")
            .populate("needs")
            .exec(function (err, foundFriend) {
                if (err) res.status(500).send(err);
                res.send(foundFriend);
            });
    });


module.exports = userRoute;