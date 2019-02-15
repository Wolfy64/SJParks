/*jshint esversion: 8 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SubscriptionLogSchema = new mongoose.Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    parks: [{
        type: Schema.Types.ObjectId,
        ref: 'Park',
        required: true
    }],
    subscribing: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

const SubscriptionLog = mongoose.model('SubscriptionLog', SubscriptionLogSchema);
module.exports = SubscriptionLog;
