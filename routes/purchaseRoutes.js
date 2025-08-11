const express = require('express');
const purchaseController = require('../controllers/purchasesController.js');
const router = express.Router();


router.get('/', purchaseController.get)
router.post('/', purchaseController.post)

router.route('/:id')
    .get(purchaseController.getDetails)
    .put(purchaseController.update)
    .delete(purchaseController.delete)


module.exports = router