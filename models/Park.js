const mongoose = require('mongoose');

const ParkSchema = new mongoose.Schema({
    name: String,
});

const Park = mongoose.model('Park', ParkSchema);
module.exports = Park;