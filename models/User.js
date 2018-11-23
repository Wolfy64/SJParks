const mongoose = require('mongoose');
const crypto = require('../lib/cryptoHelper');
// const uniqueValidator = require('mongoose-unique-validator');
// var jwt = require('jsonwebtoken');
// var secret = require('../config').secret;
const Schema = mongoose.Schema;

const UserSchema = new mongoose.Schema({
    
    salt: String,

    first_name: {type: String, required: true, max: 100},

    last_name: {type: String, required: true, max: 100},

    username: {type: String, lowercase: true, required: true, unique: true, match: [/^[a-zA-Z0-9]+$/, 'invalid username'], index: true},

    password: {type: String, required: [true, "Password Required"]},

    admin: {type: Boolean, default: false},

    email: {type: String, lowercase: true, required: [true, "you must enter an email"], unique: true,
        match: [/\S+@\S+\.\S+/, 'is invalid'], index: true}, 
    
    // phone: {type: String, match: [ /(+\d+)+\d+\-\d+/, "(999) 999 - 9999"], required: [true, "you must enter a phone number"], unique: true},

    parks:[{ type: Schema.Types.ObjectId, ref: 'Park' }],
    // for easy referene to issues
    issues:[{ type: Schema.Types.ObjectId, ref: 'Messagelog' }]

}, {timestamps: true});

// TODO Creat Virtual Fields for optimization
UserSchema.virtual('name').get(function () { return this.last_name + ', ' + this.first_name; });

UserSchema.virtual('activeSUBS').get(function () { 
    return this.phone + '{' + this.parks + ' }' 
}   );



UserSchema.methods.validate_password = function(password) {
    console.log('22222222222222222222222222');
    console.log('22222222222222222222222222');
    console.log(this.salt);
    console.log(this.password);
    console.log('22222222222222222222222222');
    console.log('22222222222222222222222222');
    var hash = crypto.getPasswordHash(password, this.salt);
    return this.password === hash;
}

// add 'Unique' validation to this schema
// UserSchema.plugin(uniqueValidator, { type: 'mongoose-unique-validator' });

const User = mongoose.model('User', UserSchema);
module.exports = User;