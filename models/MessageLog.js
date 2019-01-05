const mongoose = require('mongoose');
const Schema = mongoose.Schema
const uniqueValidator = require('mongoose-unique-validator');

const MessageLogSchema = new mongoose.Schema({
    title: String,
    desc: String,
    tags: [{
        type: String
    }],
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, ' must have an author']
    },
    message: {
        type: Schema.Types.ObjectId,
        ref: 'Message',
        required: true
    },
    parks: [{
        type: Schema.Types.ObjectId,
        ref: 'Park'
    }]
});

// index
MessageLogSchema.index({
    author: 1
});

// connecting to unique validator
MessageLogSchema.plugin(uniqueValidator, {
    type: 'mongoose-unique-validator'
});

const MessageLog = mongoose.model('MessageLog', MessageLogSchema);

module.exports = MessageLog;
