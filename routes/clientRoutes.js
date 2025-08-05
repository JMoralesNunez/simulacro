const express = require('express');
const clientController = require('../controllers/clientsController.js');
const router = express.Router();


router.get('/', clientController.get)

router.route('/:id')
    .get(clientController.getDetails)


module.exports = router