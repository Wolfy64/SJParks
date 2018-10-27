const mongoose = require('mongoose');
const Schema = mongoose.Schema
const uniqueValidator = require('mongoose-unique-validator');

//DEF creating 'Park' schema
const ParkSchema = new mongoose.Schema({
    parkID: {
        type: String,
        max: 10,
        required: [true, 'REQUIRED: Park Code'],
        unique: true,
    },
    name: {
        type: String,
        max: 50,
        required: [true, 'REQUIRED: Park Name' ],
        unique: true,
        uniqueCaseInsensitive: true,
        match: [/^[a-zA-Z0-9]+$/, 'invalid usernam, must be a letter or a number.'],
    },
    users: [{
        type: Schema.Types.ObjectId,
        ref: 'User',
        unique: true
    }],
}, {timestamps: true});


// ADD 'Unique' validator
ParkSchema.plugin(uniqueValidator);

//CREATE and EXPORT 'Park' model
const Park = mongoose.model('Park', ParkSchema);
module.exports = Park;