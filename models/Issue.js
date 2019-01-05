const mongoose = require('mongoose');
const Schema = mongoose.Schema

const IssueSchema = new mongoose.Schema({
    parkID: {type: Schema.Types.ObjectId, required: true},
    title: String,
    desc: String,
    author: {type: Schema.Types.ObjectId, required: true, ref: 'User'},
    //for faster query when sending updates
    users:[{ type: Schema.Types.ObjectId, ref: 'User'}], 
});

const Issue = mongoose.model('Issue', IssueSchema);
module.exports = Issue;