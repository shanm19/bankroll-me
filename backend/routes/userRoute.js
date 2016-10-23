var express = require('express');
var userRoute = express.Router();
var User = require('../schemas/userSchema');
var Desire = require('../schemas/desireSchema');

userRoute.route("/")
    .get(function (req, res) {
        User.find({}, function (err, users) {
            if (err) res.status(500).send(err);
            res.send(users);
        });
    })
    .post(function (req, res) {
        var newUser = new User(req.body);

        newUser.save(function (err, savedUser) {
            if (err) res.status(500).send(err);
            res.send(savedUser);
        });
    });

userRoute.route("/:id")
    .get(function (req, res) {
        User.findOne({
                _id: req.params.id
            })
            .populate("wants")
            .populate("needs")
            .populate("friends")
            // .populate({
            //     path: 'friends',
            //     populate: {
            //         path: 'wants'
            //     }
            // })
            // .populate({
            //     path: 'friends',
            //     populate: {
            //         path: 'needs'
            //     }
            // })
            .exec(function (err, foundUser) {

                console.log(foundUser);
                if (err) res.status(500).send(err);
                res.send(foundUser);
            });
    })
    .put(function (req, res) {
        var type = req.query.type;
        var targetDesireID;

        User.findOne({
            _id: req.params.id
        }, function (err, foundUser) {
            if (err) {
                res.status(500).send(err);
            } else if (foundUser._id) {

                if (type === "wants" || type === "needs") {

                    var newWant = req.body;

                    Desire.findOne({
                        name: newWant.name
                    }, function (err, foundDesire) {
                        if (err) res.status(500).send(err);
                        if (!foundDesire) {
                            var newDesire = new Desire({
                                name: newWant.name,
                                cost: newWant.cost,
                                description: newWant.description
                            });
                            newDesire.save(function (err, savedDesire) {
                                if (err) res.status(500).send(err);

                                targetDesireID = savedDesire._id;

                                foundUser[type].push(targetDesireID);
                                foundUser.save(function (err, savedUser) {
                                    if (err) res.status(500).send(err);
                                    res.send(savedUser[type]);
                                });
                            });

                        } else {
                            targetDesireID = foundDesire._id;

                            foundUser[type].push(targetDesireID);
                            foundUser.save(function (err, savedUser) {
                                if (err) res.status(500).send(err);
                                res.send(savedUser[type]);
                            });
                        }


                    });
                } else if (type === "friends") {
                    foundUser[type].push(req.body._id);
                    foundUser.save(function (err, savedUser) {
                        if (err) res.status(500).send(err);
                        res.send(req.body);
                    });
                }

            }
        });

    })

// var collection = (req.body.type === 'want') ? "Want" : "need";
// var targetDesireID;
// User.findOne({
//     _id: req.params.id
// }, function (err, foundUser) {
//     if (err) res.status(500).send(err);
//     if (foundUser._id) {
//         Desire.find({
//             name: req.body.name
//         }, function (err, foundDesire) {
//             if (err) res.status(500).send(err);
//             if (!foundDesire) {
//                 var newDesire = new Desire({
//                     name: req.body.name,
//                     cost: req.body.cost
//                 });
//                 newDesire.save(function (err, savedDesire) {
//                     if (err) res.status(500).send(err);
//                     targetDesireID = savedDesire._id;
//                 });
//             } else {
//                 targetDesireID = foundDesire._id;
//             }
//         });
//     }

//     console.log("foundUser ", foundUser);
// req.body.type = targetDesireID;
// delete req.body.name;
// delete req.body.cost;
// foundUser.needs.push(req.body);
// foundUser.save(function (err, savedUser) {
//     if (err) res.status(500).send(err);
//     res.send(savedUser.needs);
// });
// });

// .put(function (req, res) {
//     // var collection = (req.body.type === 'want') ? "Want" : "need";
//     var targetDesireID;
//     console.log(req.params.id);
//     console.log(req.body);
//     User.findOne({
//         _id: req.params.id
//     }, function (err, foundUser) {
//         if (err) res.status(500).send(err);
//         if (foundUser._id) {
//             Desire.find({
//                 name: req.body.name
//             }, function (err, foundDesire) {
//                 if (err) res.status(500).send(err);
//                 if (!foundDesire) {
//                     var newDesire = new Desire({
//                         name: req.body.name,
//                         cost: req.body.cost
//                     });
//                     newDesire.save(function (err, savedDesire) {
//                         if (err) res.status(500).send(err);
//                         targetDesireID = savedDesire._id;
//                     });
//                 } else {
//                     targetDesireID = foundDesire._id;
//                 }
//             });
//         }

//         console.log("foundUser ", foundUser);
//         req.body.type = targetDesireID;
//         delete req.body.name;
//         delete req.body.cost;
//         foundUser.needs.push(req.body);
//         foundUser.save(function (err, savedUser) {
//             if (err) res.status(500).send(err);
//             res.send(savedUser.needs);
//         });
//     });
// })
// .put(function (req, res) {
//     console.log(req.params.id);
//     console.log(req.body);
//     User.findOneAndUpdate({
//         _id: req.params.id
//     }, req.body, {
//         new: true
//     }, function (err, updatedUser) {
//         if (err) res.status(500).send(err);
//         res.send(updatedUser);
//     });
// })
.delete(function (req, res) {
    User.findOneAndRemove({
        _id: req.params.id
    }, function (err, deletedUser) {
        if (err) res.status(500).send(err);
        res.send(deletedUser);
    });
});

module.exports = userRoute;