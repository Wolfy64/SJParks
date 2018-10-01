const mongoose = require('mongoose');
// const uniqueValidator = require('mongoose-unique-validator');
const crypto = require('crypto');
// var jwt = require('jsonwebtoken');
// var secret = require('../config').secret;
const Schema = mongoose.Schema;

const UserSchema = new mongoose.Schema({
    
    salt: String,

    first_name: {type: String, required: true, max: 100},

    last_name: {type: String, required: true, max: 100},

    username: {type: String, lowercase: true,  unique: true, match: [/^[a-zA-Z0-9]+$/, 'invalid username'], index: true},

    password: {type: String, required: [true, "Password Required"], index: true},

    admin: {type: Boolean, default: false},

    email: {type: String, lowercase: true, required: [true, "you must enter an email"], unique: true,
        match: [/\S+@\S+\.\S+/, 'is invalid'], index: true}, 
    
<<<<<<< HEAD
    //phone: {type: String, match: [ /(+\n+)+\n+\-\n+/, "(999) 999 - 9999"], required: [true, "you must enter a phone number"], unique: true},

    parks:[{ type: Schema.Types.ObjectId, ref: 'Park' }]
    //for easy referene to issues
    //issues:[{ type: Schema.Types.ObjectId, ref: 'Issue' }]
=======
    phone: {type: String, default: "(999) 999 - 9999", unique: true} ,
    
    notes:{type: String, default: "Nothing to note"},

    parks:[{ type: Schema.Types.ObjectId, ref: 'Park' }],
    //for easy referene to issues
    //issues:[{ type: Schema.Types.ObjectId, ref: 'Issue' }]
    
    salt: String,

    hash: String
>>>>>>> Data architecture overhaul

}, {timestamps: true});

// TODO Creat Virtual Fields for optimization
UserSchema.virtual('name').get(function () { return this.last_name + ', ' + this.first_name; });

UserSchema.virtual('activeSUBS').get(function () { 
    return this.phone + '{' + this.parks + ' }' 
}   );

//schema methods
// sets the password with a hash
UserSchema.methods.setPassword = function(password){
    this.salt = crypto.randomBytes(16).toString('hex');
    this.password = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
  };


UserSchema.methods.validate_password = function(password) {
    // this.salt = crypto.randomBytes(16).toString('hex');
    // this.hash = crypto.pbkdf2Sync('DippedInParks', this.salt, 10000, 512, 'sha512').toString('hex');
    this.setPassword('DippedInParks')
    var hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
    return this.password === hash;
}

// add 'Unique' validation to this schema
// UserSchema.plugin(uniqueValidator, { type: 'mongoose-unique-validator' });

const User = mongoose.model('User', UserSchema);
module.exports = User;