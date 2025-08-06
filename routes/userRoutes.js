const express = require('express');
const userController = require('../controllers/usersController.js');
const router = express.Router();

router.get('/', userController.get);
router.post('/', userController.post)

router.route('/:id')
    .get(userController.getDetails)

module.exports = router