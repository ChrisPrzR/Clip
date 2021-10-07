const {Schema, model} = require('mongoose');

const UserSchema = Schema({

    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    address: {
        type: [String],
        required: true
    },
    phoneNumber: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        default: new Date()
    }
});

module.exports = model( 'User', UserSchema )