const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username:{
        type: String,
        unique: true
      },

    password:{
        type: String,
        unique: true
      },

    phone: {
        type: String,
        default:"(999) 999 - 9999"
    },

    admin: {
        type: Boolean,
        default: false,
    },
    
    notes:{
        type: String,
        default: "Nothing to note"
    }
});

const User = mongoose.model('User', UserSchema);
module.exports = User;