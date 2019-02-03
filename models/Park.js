const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');

const ParkSchema = new mongoose.Schema({
    active: {
        type: Boolean,
        default: true
    },
    
    code: {
        type: String,
        unique: [true, 'Park code must be unique'],
        required: [true, 'Park code is required'],
        validate: {
            validator: x => /\s{8}/.test(x),
            message: props => `${props.value} is not a valid park code!`
        }
    },

    name: {
        type: String,
        unique: [true, 'Park name must be unique'],
        required: [true, 'Park name is required'],
        validate: {
            validator: x => /\s{25}/.test(x),
            message: props => `${props.value} is not a valid park code!`
        }
    },
    subscriptionLogs: [{
        type: Schema.Types.ObjectId,
        ref: 'subscriptionLog'
    }],
    
    messageLogs: [{
        type: Schema.Types.ObjectId,
        ref: 'messageLog'
    }]
}, {
    timestamps: true
    });

ParkSchema.set('toJSON', { getters: true, virtuals: false });
    
ParkSchema.methods.addSubscriptionLog = (newSubscriptionLogId) => {
    this.subscriptionLogs.push(newSubscriptionLogId);    
};

ParkSchema.methods.addMessageLog = (newMessageLogId) => {
    this.messageLogs.push(newMessageLogId);    
};

ParkSchema.plugin(uniqueValidator, {
    type: 'mongoose-unique-validator'
});
const Park = mongoose.model('Park', ParkSchema);

module.exports = Park;
