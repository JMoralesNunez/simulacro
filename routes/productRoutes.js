const express = require('express');
const productController = require('../controllers/productsController.js');
const router = express.Router();


router.get('/', productController.get)
router.post('/', productController.post)

router.route('/:id')
    .get(productController.getDetails)
    .put(productController.update)
    .delete(productController.delete)


module.exports = router