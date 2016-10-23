var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = require('./userSchema').Schema;
var desireSchema = require('./desireSchema').Schema;

var newsSchema = new Schema({
    headline: {
        type: String,
        required: true,
        unique: true
    },
    personRolled: {
        type: Schema.Types.ObjectId,
        ref: "User",
        desireRolled: {
            type: Schema.Types.ObjectId,
            ref: "Desire"
        }
    }
});

module.exports = mongoose.model("News", newsSchema);