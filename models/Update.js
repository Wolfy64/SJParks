const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;

const UpdateSchema = new mongoose.Schema({
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, "must have an author"]
    },
    message: {
        type: String,
        required: true,
        index: true
    },
    log: [{
        type: Schema.Types.ObjectId,
        ref: 'MessageLog'
    }],
    parks: [{
        type: Schema.Types.ObjectId,
        ref: 'Park'
    }]
}, {
    timestamps: true
    });
     
// add 'Unique' validation to this schema
UpdateSchema.plugin(uniqueValidator, {
    type: 'mongoose-unique-validator'
});

const Update = mongoose.model('Message', UpdateSchema);
module.exports = Update;
