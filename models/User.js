/*jshint esversion: 6 */
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const jwt = require('jsonwebtoken');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({

  salt: String,

  active: {
    type: Boolean,
    default: true
  },

  imageUrl: {
    type: String
  },

  access: {
    type: String,
    default: 'basic'
  },

  userName: {
    type: String,
    required: [true, 'please enter a username'],
    // match: [/^[a-zA-Z0-9]+$/, 'invalid username'],
    index: true
  },

  password: {
    type: String,
    required: true
  },

  firstName: String,

  lastName: String,

  email: {
    index: true,
    type: String,
    required: [true, 'you must enter an email'],
    // match: [/\S+@\S+\.+\S/, 'is invalid'],
  },

  phone: {
    index: true,
    type: String,
    required: [true, 'you must enter a phone number'],
    /*match: [ /\d{3}+\-+\d{3}+\-+\d{4}/, '999-999-9999']*/
  },

  parks: [{
    type: Schema.Types.ObjectId,
    ref: 'Park'
  }],

  updates: [{
    type: Schema.Types.ObjectId,
    ref: 'Update'
  }],

}, {
  timestamps: true
});



// Create Schema Virtuals
UserSchema.virtual('name').get(() => {
  return  this.firstName + ' ' + this.lastName;
});

UserSchema.virtual('name').set((x) => {
  const N = x.split(' ');
  this.firstName = N[0];
  this.lastName = N[1];
});

UserSchema.virtual('subscriptions').get(function () {
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
UserSchema.methods.setPassword = newPassword => {
  bcrypt.genSalt(16, (err, newSalt) => {
    if (err) throw err;
    this.salt = newSalt;
    bcrypt.hash(newPassword, this.salt, (err, newPasswordHash) => {
      if (err) throw err;
      this.password = newPasswordHash;
    });
  });
};

UserSchema.methods.validatePassword = (candidatePassword) => {
  return new Promise((resolve, reject) => {
    bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
      if (err) return reject(err);
      resolve(isMatch);
    });
  });
};

UserSchema.methods.generateJWT = () => {
  const today = new Date();
  const expirationDate = new Date(today);
  expirationDate.setDate(today.getDate() + 60);

  return jwt.sign({
    id: this._id,
    userName: this.userName,
    exp: parseInt(expirationDate.getTime() / 1000, 10),
  }, require('config').secret);
};

UserSchema.methods.toAuthJSON = () => {
  return {
    _id: this._id,
    name: this.name,
    email: this.email,
    token: this.generateJWT(),
  };
};

module.exports = mongoose.model('User', UserSchema);
