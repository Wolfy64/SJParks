const mongoose = require('mongoose');
//const uniqueValidator = require('mongoose-unique-validator');
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
    parks: [{
        type: Schema.Types.ObjectId,
        ref: 'Park'
    }]
}, {
    timestamps: true
    });
     
// add 'Unique' validation to this schema
// UpdateSchema.plugin(uniqueValidator, {
//     type: 'mongoose-unique-validator'
// });

const Update = mongoose.model('Update', UpdateSchema);
module.exports = Update;
