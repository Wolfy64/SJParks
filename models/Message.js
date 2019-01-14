const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;

const MessageSchema = new mongoose.Schema({
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, "must have a user"]
    },
    message: {
        type: String,
        required: true,
    },
    log: [{
        type: Schema.Types.ObjectId,
        ref: 'UpdateLog'
    }],
    parks: [{
        type: Schema.Types.ObjectId,
        ref: 'Park'
    }]
}, {
    timestamps: true
});
// add 'Unique' validation to this schema
MessageSchema.plugin(uniqueValidator, {
    type: 'mongoose-unique-validator'
});

const Message = mongoose.model('Message', MessageSchema);
module.exports = Message;
