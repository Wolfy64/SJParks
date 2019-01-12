const mongoose = require('mongoose');
// const crypto = require('../lib/cryptoHelper');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const UserSchema = new mongoose.Schema({

    salt: String,

    firstName: {
        type: String,
        required: true,
        max: 100
    },

    lastName: {
        type: String,
        required: true,
        max: 100
    },

    userName: {
        type: String,
        lowercase: true,
        required: true,
        match: [/^[a-zA-Z0-9]+$/, 'invalid username'],
        index: true
    },

    password: {
        type: String,
        required: [true, "Password Required"]
    },

    admin: {
        type: Boolean,
        default: false
    },

    email: {
        type: String,
        required: [true, "you must enter an email"],
        match: [/\S+@\S+\.\S+/, 'is invalid'],
        index: true
    },

    phone: {
        type: String,
        /*match: [ /\d{3}-/d{3}/, "(999) 999 - 9999"],*/
         required: [true, "you must enter a phone number"],
        unique: true
    },

    parks: [{
        type: Schema.Types.ObjectId,
        ref: 'Park'
    }],

    messages: [{
        type: Schema.Types.ObjectId,
        ref: 'Messagelog'
    }],

    imageUrl: {
        type: String
    }

}, {
    timestamps: true
});

// TODO Creat Virtual Fields for optimization
UserSchema.virtual('name-lf').get(() => {
    return this.lastName + ', ' + this.firstName;
});

UserSchema.virtual('name-fl').get(() => {
    return this.firstName + ' ' + this.lastName;
});

UserSchema.virtual('name').set((x) => {
    const N = x.split(' ');
    this.firstName = x.split(',').length > 0 ? N[1] : N[0],
    this.lastName = N.pop(N.indexOf(this.firstname));
});

// UserSchema.virtual('activeSUBS').get(function () {
//     return this.phone + '{' + this.parks + ' }'
// });

// UserSchema.methods.validate_password = function (password) {
//     var hash = crypto.getPasswordHash(password, this.salt);
//     return this.password === hash;
// }

// add 'Unique' validation to this schema
UserSchema.plugin(uniqueValidator, {
    type: 'mongoose-unique-validator'
});

const User = mongoose.model('User', UserSchema);
module.exports = User;
