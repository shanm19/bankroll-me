var express = require('express');
var signInRoute = express.Router();
var User = require('../schemas/userSchema');
var Desire = require('../schemas/desireSchema');

signInRoute.route("/")
    .get(function (req, res) {
        User.findOne({
                username: req.query.username,
                password: req.query.password
            })
            .populate("wants")
            .populate("needs")
            .populate("friends")
            .exec(function (err, foundUser) {
                if (err) res.status(500).send(err);
                res.send(foundUser);
            });
    });

module.exports = signInRoute;