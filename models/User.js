const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const crypto = require('../lib/cryptoHelper');
const uniqueValidator = require('mongoose-unique-validator');


//DEF create 'User' schema
const UserSchema = new mongoose.Schema({

    salt: String,

    first_name: {
        type: String,
        max: 100,
        required: true,
        unique: true,
        match: [/^[a-zA-Z]+$/, 'An Invalid username was entered. Please enter a valid letter.'],
    },

    last_name: {
        type: String,
        max: 100,
        required: true,
        unique: true,
        match: [/^[a-zA-Z]+$/, 'An Invalid username was entered. Please enter a valid letter.'],
    },

    username: {
        type: String,
        max: 100,
        required: true,
        unique: true,
        uniqueCaseInsensitive: true,
        match: [/^[a-zA-Z0-9]+$/, 'An Invalid username was entered. Please enter either a letter or a number.'],
        index: true
    },

    password: {
        type: String,
        required: [true, 'REQUIRED: Password'],
        uniqueCaseInsensitive: true,
    },

    admin: {type: Boolean, default: false},

    email: {
        type: String,
        lowercase: true,
        required: true,
        unique: true,
        match: [/\S+@\S+\.\S+/, 'is invalid'],
        index: true
    },

    phone: {
        type: String,
        required: true,
        unique: true
    }, // match: [/(+\d+)+\d+\-\d+/, "(999) 999 - 9999"]

    parks: [{
        type: Schema.Types.ObjectId,
        ref: 'Park',
        unique: true
    }],

    issues:[{ type: Schema.Types.ObjectId, ref: 'Issue' }]

}, {timestamps: true});

//DEF Create Virtual Fields
UserSchema.virtual('name').get(function ()
{
    return this.last_name + ', ' + this.first_name;
});

UserSchema.virtual('activeSUBS').get(function ()
{
    return this.phone + this.parks
});


// ADD 'Unique' validator
UserSchema.plugin(uniqueValidator);


// ADD 'Ppassword' validator
UserSchema.methods.validate_password = function (password)
{
    var hash = crypto.getPasswordHash(password, this.salt);
    return this.password === hash;
}

// add 'Unique' validation to this schema
UserSchema.plugin(uniqueValidator);

const User = mongoose.model('User', UserSchema);
module.exports = User;