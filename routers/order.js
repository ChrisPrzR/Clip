const express = require('express');

const { createOrder, updateOrder } = require('../controllers/order');

const router = express.Router();

router.post('/:userId', createOrder);

router.put('/:id', updateOrder);

module.exports = router