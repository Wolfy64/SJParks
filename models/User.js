const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const jwt = require('jsonwebtoken');
const Schema = mongoose.Schema;
const crypto = require('crypto');

const UserSchema = new mongoose.Schema({

    salt: String,

    firstName: {
        type: String,
        default: "Unknown",
        max: 100
    },

    lastName: {
        type: String,
        default: "Unknown",
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
        required: true
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
        index: true
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

// Create Schema Virtual Fields
UserSchema.virtual('name-lf').get(() =>
{
    return this.lastName + ', ' + this.firstName;
});

UserSchema.virtual('name-fl').get(() =>
{
    return this.firstName + ' ' + this.lastName;
});

UserSchema.virtual('name').set((x) =>
{
    const N = x.split(' ');
    this.firstName = x.split(',').length > 0 ? N[1] : N[0],
        this.lastName = N.pop(N.indexOf(this.firstname));
});

// UserSchema.virtual('activeSUBS').get(function () {
//     return this.phone + '{' + this.parks + ' }'
// });

// Set Schema methods
UserSchema.methods.setPassword = password =>
{
    this.salt = crypto.randomBytes(16).toString('hex')
    this.password = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
}

UserSchema.methods.validatePassword = password =>
{
    const hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
    return this.password === hash;
};

UserSchema.methods.generateJWT = () =>
{
    const today = new Date();
    const expirationDate = new Date(today);
    expirationDate.setDate(today.getDate() + 60);

    return jwt.sign({
        email: this.email,
        id: this._id,
        exp: expirationDate.getTime() / 1000
    }, 'secret');
}

UserSchema.methods.toAuthJSON = () =>
{
    return {
        _id: this._id,
        email: this.email,
        token: this.generateJWT(),
    };
};

// add 'Unique' validation to this schema
UserSchema.plugin(uniqueValidator, {
    type: 'mongoose-unique-validator'
});

const User = mongoose.model('User', UserSchema);
module.exports = User;
