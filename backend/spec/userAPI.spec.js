var supertest = require('supertest');
var _ = require('lodash');
var expect = require('chai').expect;
var server = require('../server');
var request = supertest(server);

var baseUrl = "http://localhost:8080";

describe("User API Endpoints / ", function () {
    /* for dummy data
    beforeEach(function(){

    });
    afterEach(function(){

    });
    */
    describe("GET requests / ", function () {
        it("GET /users should get an array of all users", function (done) {
            request(baseUrl)
                .get("/users")
                .expect(200)
                .end(function (err, res) {
                    expect(res.body).to.be.a('array');
                    if (err) return done(err);
                    done();
                    // _.isArray === true;

                    // if (res.body.length) {
                    //     var response = res.body[0];
                    //     _.isObject(response) === true;
                    //     _.isString(response.username) === true;
                    //     _.isString(response.password) === true;
                    //     _.isString(response.firstName) === true;
                    //     _.isString(response.lastName) === true;
                    //     _.isArray(response.wants) === true;
                    //     _.isArray(response.needs) === true;
                    //     _.isArray(response.peopleRolled) === true;
                    //     _.isArray(response.rolledBy) === true;
                    // }
                    // done();
                });
        });

        describe("POST requests / ", function () {
            var newUser = require('./dummyData/newUser');

            it("POST /users should post and return a new bounty record", function (done) {
                request(baseUrl)
                    .post("/users", newUser)
                    .expect(200, done())
                    .expect(function (res) {
                        var response = res.data;
                        _.isObject(response) === 2;
                        _.isString(response.username) === true;
                        _.isString(response.password) === true;
                        _.isString(response.firstName) === true;
                        _.isString(response.lastName) === true;
                        _.isArray(response.wants) === true;
                        _.isArray(response.needs) === true;
                        _.isArray(response.peopleRolled) === true;
                        _.isArray(response.rolledBy) === true;
                        _.isString(response._id) === true;
                        done();
                    });
            });
        });

        describe("DELETE users/:id", function () {
            it("should delete the object with the associated ID", function (done) {
                request.delete("") //users/12345
                    .expect(200)
                    .end(function (err, res) {
                        var response = res.body;
                        expect(response).to.be.a('object');
                        expect(response).to.have.property('_id');
                        expect(response._id).to.equal('12345');
                        if (err) return done(err);
                        done();
                    });
            });
        });



    });
});