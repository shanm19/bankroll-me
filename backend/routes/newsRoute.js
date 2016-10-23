var express = require('express');
var newsRoute = express.Router();
var News = require('../schemas/newsSchema');
var User = require('../schemas/userSchema');

newsRoute.route('/')
    .get(function (req, res) {
        News.find({}, function (err, foundNews) {
            if (err) res.status(500).send(err);
            res.send(foundNews);
        });
    })
    .post(function (req, res) {
        var newNews = new News(req.body);
        newNews.save(function (err, savedNews) {
            if (err) res.status(500).send(err);
            res.send(savedNews);
        });
    });

newsRoute.route('/:id')
    .get(function (req, res) {
        News.findOne({
                _id: req.params.id
            })
            .populate("User")
            .exec(function (err, foundNews) {
                if (err) res.status(500).send(err);
                res.send(foundNews);
            });
    })
    .put(function (req, res) {
        News.findOneAndUpdate({
            _id: req.params.id
        }, req.body, {
            new: true
        }, function (err, updatedNews) {
            if (err) res.status(500).send(err);
            res.send(updatedNews);
        });
    })
    .delete(function (req, res) {
        News.findOneAndRemove({
            _id: req.params.id
        }, function (err, deletedNews) {
            if (err) res.status(500).send(err);
            res.send(deletedNews);
        });
    });

module.exports = newsRoute;