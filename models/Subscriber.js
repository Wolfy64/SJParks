const mongoose = require('mongoose');

const SubscriberSchema = new mongoose.Schema({
    phone: String,
});

const Subscriber = mongoose.model('Subscriber', SubscriberSchema);
module.exports = Subscriber;