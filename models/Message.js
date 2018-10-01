const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;

const MessageSchema = new mongoose.Schema({
    // messID:this._id, 

    //author of message
    user : { type: Schema.Types.ObjectId, ref: 'User', required:[true, "must have id"] },
    parks : [{ type: Schema.Types.ObjectId, ref: 'Park' }],
    message : {type: String, required: true, }
}, {timestamps: true});

module.exports = mongoose.model('Message', MessageSchema);