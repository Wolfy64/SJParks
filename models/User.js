const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const crypto = require('crypto');
var jwt = require('jsonwebtoken');
var secret = require('../config').secret;
const Schema = mongoose.Schema;

const UserSchema = new mongoose.Schema({

    username: {type: String, lowercase: true,  unique: true, required: [true, "can't be blank"], match: [/^[a-zA-Z0-9]+$/, 'invalid username'], index: true},

    password: {type: String, required: [true, "Password Required"], index: true},

    admin: {type: Boolean, default: false},

    first_name: {type: String, required: true, max: 100},

    last_name: {type: String, required: true, max: 100},

    email: {type: String, lowercase: true,  unique: true, required: [true, "can't be blank"], match: [/\S+@\S+\.\S+/, 'is invalid'], index: true}, 
    
    phone: {type: String, default: "(999) 999 - 9999", unique: true} ,
    
    notes:{type: String, default: "Nothing to note"},

    parks:[{ type: Schema.Types.ObjectId, ref: 'Park' }],

    issues:[{ type: Schema.Types.ObjectId, ref: 'Message' }]

}, {timestamps: true});

// TODO Creat Virtual Fields for optimization
UserSchema.virtual('name').get(function () { return this.last_name + ', ' + this.first_name; });

UserSchema.virtual('activeSUBS').get(function () { 
//     return this.phone + '{' + this.parks + ' }' 
// }   );

//schema methods
UserSchema.methods.setPassword = function(password){
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
  };

UserSchema.methods.validPassword = function(password) {
    var hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
    return this.hash === hash;
}

// add 'Unique' validation to this schema
UserSchema.plugin(uniqueValidator, { type: 'mongoose-unique-validator' });

const User = mongoose.model('User', UserSchema);
module.exports = User;