const mongoose = require('mongoose');
const Schema = mongoose.Schema
const uniqueValidator = require('mongoose-unique-validator');

//DEF creating 'Park' schema
const ParkSchema = new mongoose.Schema({
    code: {
        type: String,
        unique: [true, 'Park code must be unique'],
        required: [true, 'Park code is required'],
        validate: {
            validator: x => /\s{8}/.test(x),
            message: props => `${props.value} is not a valid park code!`
        }
    },

    name: {
        type: String,
        unique: [true, 'Park name must be unique'],
        required: [true, 'Park name is required']
    },

    users: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],

    updatelog: [{
        type: Schema.Types.ObjectId,
        ref: 'UpdateLog'
    }]
}, {
    timestamps: true
});

// connecting to unique validator
ParkSchema.plugin(uniqueValidator, {
    type: 'mongoose-unique-validator'
});


// ADD 'Unique' validator
ParkSchema.plugin(uniqueValidator);

//CREATE and EXPORT 'Park' model
const Park = mongoose.model('Park', ParkSchema);

module.exports = Park;
