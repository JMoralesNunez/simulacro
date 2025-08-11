const express = require('express');
const receiptController = require('../controllers/receiptsController.js');
const router = express.Router();


router.get('/', receiptController.get)
router.post('/', receiptController.post)

router.route('/:id')
    .get(receiptController.getDetails)
    .put(receiptController.update)
    .delete(receiptController.delete)


module.exports = router