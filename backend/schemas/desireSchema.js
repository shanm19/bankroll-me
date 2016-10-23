var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var desireSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    cost: {
        type: Number,
        required: true
    },
    description: String,
    moneyPledged: {
        type: Number,
        default: 0
    },
    bought: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model("Desire", desireSchema);