const express = require('express');
const clientController = require('../controllers/clientsController.js');
const router = express.Router();


router.get('/', clientController.get)
router.post('/', clientController.post)

router.route('/:id')
    .get(clientController.getDetails)
    .put(clientController.update)
    .delete(clientController.delete)


module.exports = router