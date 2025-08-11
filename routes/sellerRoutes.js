const express = require('express');
const sellerController = require('../controllers/sellersController.js');
const router = express.Router();


router.get('/', sellerController.get)
router.post('/', sellerController.post)

router.route('/:id')
    .get(sellerController.getDetails)
    .put(sellerController.update)
    .delete(sellerController.delete)


module.exports = router