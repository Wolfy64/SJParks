const mongoose = require('mongoose');

const AdministratorSchema = new mongoose.Schema({
    username:String,
    password:String,
    phone: String,
    Admin: {
        type: Boolean,
        default: true,
    },
});

const Administrator = mongoose.model('Administrator', AdministratorSchema);
module.exports = Administrator;