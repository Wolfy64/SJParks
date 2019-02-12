/*jshint esversion: 6 */
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const jwt = require('jsonwebtoken');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema(
  {
    active: {
      type: Boolean,
      default: true
    },

    access: {
      type: String,
      default: 'basic'
    },

    salt: String,

    imageUrl: String,

    firstName: String,

    lastName: String,

    email: {
      index: true,
      type: String,
      required: [true, 'you must enter an email']
    },

    phone: {
      index: true,
      type: String,
      required: [true, 'you must enter a phone number']
    },

    userName: {
      index: true,
      type: String,
      required: [true, 'you must enter a username']
    },

    password: {
      type: String,
      required: [true, 'you must provide a password']
    },

    parks: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Park'
      }
    ],

    updates: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Update'
      }
    ]
  },
  {
    timestamps: true
  }
);

// Create Schema Virtuals
UserSchema.virtual('name').set(x => {
  const N = x.split(' ');
  this.firstName = N[0];
  this.lastName = N[1];
});

UserSchema.virtual('name').get(() => {
  return this.firstName + ' ' + this.lastName;
});

UserSchema.virtual('subscriptions').get(function() {
  return {
    active: this.active,
    access: this.access,
    email: this.email,
    twilio: {
      phone: this.phone,
      subscriptions: this.parks
    }
  };
});

UserSchema.set('toJSON', { getters: true, virtuals: true });

// Configure Custom Validators
UserSchema.plugin(uniqueValidator, {
  type: 'mongoose-unique-validator'
});

// Configure Schema methods
/*
"Do not declare methods using ES6 arrow functions (=>). Arrow functions explicitly  prevent binding this, so your method will not have access to the document and the above examples will not work.""

from: https://mongoosejs.com/docs/guide.html,
 */

UserSchema.methods.setPassword = function(newPassword) {
  bcrypt.genSalt(16, function(err, newSalt) {
    if (err) throw err;
    this.salt = newSalt;
    bcrypt.hash(newPassword, newSalt, function(err, newPasswordHash) {
      if (err) throw err;
      this.password = newPasswordHash;
    });
  });
};

UserSchema.methods.validatePassword = function(candidatePassword) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
      if (err) return reject(err);
      resolve(isMatch);
    });
  });
};

UserSchema.methods.generateJWT = function() {
  const today = new Date();
  const expirationDate = new Date(today);
  expirationDate.setDate(today.getDate() + 60);
  const token = jwt.sign(
    {
      _id: this._id,
      userName: this.userName,
      expirationDate: parseInt(expirationDate.getTime() / 1000, 10)
    },
    require('../config/keys').secret,
    { expiresIn: 600 }
  );

  return token;
};

UserSchema.methods.toAuthJSON = function() {
  return {
    _id: this._id,
    name: this.name,
    email: this.email,
    token: this.generateJWT()
  };
};

module.exports = mongoose.model('User', UserSchema);
