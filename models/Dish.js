const {Schema, model} = require('mongoose');

const DishSchema = Schema({

    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true
    },
    typeOfFood: {
        type: String,
        required: true,
    },
    available: {
        type: Boolean
    }

});

module.exports = model('Dish', DishSchema )