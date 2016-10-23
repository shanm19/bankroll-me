var mongoose = require('mongoose');
var desireSchema = require('./desireSchema').Schema;
var Schema = mongoose.Schema;

var userSchema = new Schema({
    //User Profile
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    friends: [{
        type: Schema.Types.ObjectId,
        ref: "User"
    }],
    //User's wants/needs and the current money pledged
    wants: [{
        type: Schema.Types.ObjectId,
        ref: "Desire"
    }],
    needs: [{
        type: Schema.Types.ObjectId,
        ref: "Desire"
    }],
    //people you helped
    peopleRolled: [{
        user: {
            type: Schema.Types.ObjectId,
            ref: "User"
        },
        desiresRolled: [{
            desire: {
                type: Schema.Types.ObjectId,
                ref: "Desire"
            },
            moneyPledged: {
                type: Number,
                default: 0
            }
        }]
    }],
    //people who helped you
    rolledBy: [{
        user: {
            type: Schema.Types.ObjectId,
            ref: "User"
        },
        desiresRolled: [{
            desire: {
                type: Schema.Types.ObjectId,
                ref: "Desire"
            },
            moneyPledged: {
                type: Number,
                default: 0
            }
        }]
    }]
});

module.exports = mongoose.model("User", userSchema);