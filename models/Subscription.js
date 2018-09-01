const mongoose = require('mongoose');

const SubscriptionSchema = new mongoose.Schema({
    phone: String,
    park: String,
});

const Subscription = mongoose.model('Subscription', SubscriptionSchema);
module.exports = Subscription;