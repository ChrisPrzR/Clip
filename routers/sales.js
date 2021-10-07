const express = require('express');

const { lookupSales } = require('../controllers/sales');

const router = express.Router();

router.get('/:foodCat/:startDate/:endDate', lookupSales);

module.exports = router