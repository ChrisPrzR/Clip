const express = require('express');
const { body } = require('express-validator')

const { createUser, updateUser } = require('../controllers/user');

const router = express.Router();

router.post('/', body('email', 'Must be a valid email').isEmail(), createUser);

router.put('/:id', updateUser);

module.exports = router