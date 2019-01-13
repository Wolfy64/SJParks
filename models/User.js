const mongoose = require('mongoose');
<<<<<<< HEAD
=======
// const crypto = require('../lib/cryptoHelper');
const uniqueValidator = require('mongoose-unique-validator');

>>>>>>> master
const Schema = mongoose.Schema;
const crypto = require('../lib/cryptoHelper');
const uniqueValidator = require('mongoose-unique-validator');

<<<<<<< HEAD

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
=======
const UserSchema = new mongoose.Schema({

    salt: String,
>>>>>>> master

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

<<<<<<< HEAD
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
=======
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
>>>>>>> master

// UserSchema.virtual('activeSUBS').get(function () {
//     return this.phone + '{' + this.parks + ' }'
// });

<<<<<<< HEAD
// ADD 'Ppassword' validator
UserSchema.methods.validate_password = function (password)
{
    var hash = crypto.getPasswordHash(password, this.salt);
    return this.password === hash;
}

// add 'Unique' validation to this schema
UserSchema.plugin(uniqueValidator);
=======
// UserSchema.methods.validate_password = function (password) {
//     var hash = crypto.getPasswordHash(password, this.salt);
//     return this.password === hash;
// }

// add 'Unique' validation to this schema
UserSchema.plugin(uniqueValidator, {
    type: 'mongoose-unique-validator'
});
>>>>>>> master

const User = mongoose.model('User', UserSchema);
module.exports = User;
