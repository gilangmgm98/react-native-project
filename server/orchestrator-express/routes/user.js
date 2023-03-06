const express = require('express');
const route = express.Router()
const UserController = require('../controllers/user');


route.get('/', UserController.getUsers)
route.post('/', UserController.createUser)
route.get('/:id', UserController.getUsersById)
route.delete('/:id', UserController.destroyUser)


module.exports = route