const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');

const MessageLogSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true
	},
	message: {
		type: String,
		required: [true,'']
	},
	desc: String,
	tag: {
		type: String
	},
	author: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		required: [ true, ' must have an author' ]
	},
	parks: [
		{
			type: Schema.Types.ObjectId,
			ref: 'Park'
		}
	]
});

MessageLogSchema.plugin(uniqueValidator, {
	type: 'mongoose-unique-validator'
});

const MessageLog = mongoose.model('MessageLog', MessageLogSchema);

module.exports = MessageLog;
