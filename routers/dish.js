const express = require('express');
const { body } = require('express-validator')

const { createDish, updateDish } = require('../controllers/dish');

const router = express.Router();

router.post('/', body('typeOfFood', 'This field need to be lower case').isLowercase(), createDish);

router.put('/:id', updateDish);

module.exports = router