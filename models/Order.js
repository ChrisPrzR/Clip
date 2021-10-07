const {Schema, model} = require('mongoose');

const OrderSchema = Schema({

    customer: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: new Date(),
        required: true
    },
    time: {
        type: Date,
        default: Date.now,
        required: true
    },
    customerAddress: {
        type: String,
        required: true
    },
    totalAmount: {
        type: Number,
        required: true,
    },
    orderDetails: [{
        dishName: {
            type: String,
            required: true
        },
        quantity: {
            type: Number,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        typeOfFood: {
            type: String,
            required: true
        },
        subtotal: {
            type: Number,
            required: true
        }
    }]

});

module.exports = model('Order', OrderSchema )