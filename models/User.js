const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const jwt = require('jsonwebtoken');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({

  salt: String,

  active: Boolean,

  access: {
    type: String
  },

  userName: {
    type: String,
    lowercase: true,
    required: [true, 'please enter a username'],
    // match: [/^[a-zA-Z0-9]+$/, 'invalid username'],
    index: true
  },

  password: {
    type: String,
    required: true
  },

  firstName: {
    type: String,
    default: "Unknown"
  },

  lastName: {
    type: String,
    default: "Unknown"
  },

  email: {
    type: String,
    required: [true, "you must enter an email"],
    // match: [/\S+@\S+\.\S+/, 'is invalid'],
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
    ref: 'Message'
  }],

  imageUrl: {
    type: String
  }

}, {
  timestamps: true
});

// Create Schema Virtuals
UserSchema.virtual('name').get(() => {
  return this.firstName + ' ' + this.lastName;
});

UserSchema.virtual('name').set((x) => {
  const N = x.split(' ');
  this.firstName = x.split(',').length > 0 ? N[1] : N[0];
  this.lastName = N.pop(N.indexOf(this.firstname));
});

UserSchema.virtual('activeSUBS').get(function () {
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

// Configure Schema Plugins
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

/* [DEP?]
UserSchema.methods.validatePassword = candidatePassword => {
    bcrypt.compare(candidatePassword, this.password, (err, isValid) => {
        if (err) throw err;
        return isValid;
    });
};
*/
UserSchema.methods.validatePassword = function (candidatePassword) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
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
    // phone: this.phone,
    email: this.email,
    token: this.generateJWT(),
  };
};

module.exports = mongoose.model('User', UserSchema);
