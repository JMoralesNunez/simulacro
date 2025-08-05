const express = require('express');
const purchaseController = require('../controllers/purchasesController.js');
const router = express.Router();


router.get('/', purchaseController.get)

router.route('/:id')
    .get(purchaseController.getDetails)


module.exports = router