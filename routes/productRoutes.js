const express = require('express');
const productController = require('../controllers/productsController.js');
const router = express.Router();


router.get('/', productController.get)

router.route('/:id')
    .get(productController.getDetails)


module.exports = router