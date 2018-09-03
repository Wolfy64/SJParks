const mongoose = require('mongoose');

const SubscriberSchema = new mongoose.Schema({
    phone: String,
    subscribed: {
        type: Boolean,
        default: true,
    },
});

const Subscriber = mongoose.model('Subscriber', SubscriberSchema);
module.exports = Subscriber;