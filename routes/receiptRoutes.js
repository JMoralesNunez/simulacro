const express = require('express');
const receiptController = require('../controllers/receiptsController.js');
const router = express.Router();


router.get('/', receiptController.get)

router.route('/:id')
    .get(receiptController.getDetails)


module.exports = router