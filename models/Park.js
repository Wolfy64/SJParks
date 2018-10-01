const mongoose = require('mongoose');
const Schema = mongoose.Schema

const ParkSchema = new mongoose.Schema({
    parkID: {type:String, unique:true},
    name: {type:String, unique:true},
    subscribers: [{ type: Schema.Types.ObjectId, ref: 'Subscriber' }],
    users:[{ type: Schema.Types.ObjectId, ref: 'User'}],
    
});

const Park = mongoose.model('Park', ParkSchema);
module.exports = Park;