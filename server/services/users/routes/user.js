const express = require('express');
const Controller = require('../controllers/user');
const router = express.Router()

router.get('/', Controller.findAllUser)
router.post('/', Controller.register)
router.get('/:id', Controller.findUserById)
router.delete('/:id', Controller.deleteUser)

module.exports = router