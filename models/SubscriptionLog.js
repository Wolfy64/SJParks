const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SubscriptionLogSchema = new mongoose.Schema({
    user: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    park: {type: Schema.Types.ObjectId, ref: 'Park', required: true},
    subscribing: {type: Boolean, required: true}
}, {timestamps: true});

const SubscriptionLog = mongoose.model('SubscriptionLog', SubscriptionLogSchema);
module.exports = SubscriptionLog;