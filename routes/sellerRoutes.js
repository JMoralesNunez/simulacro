const express = require('express');
const sellerController = require('../controllers/sellersController.js');
const router = express.Router();


router.get('/', sellerController.get)

router.route('/:id')
    .get(sellerController.getDetails)


module.exports = router