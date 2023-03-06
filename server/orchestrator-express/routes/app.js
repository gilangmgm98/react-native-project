const express = require('express');
const AppController = require('../controllers/app');
const route = express.Router()

route.get('/item', AppController.getAllItem)
route.post('/item', AppController.createItem)
route.delete('/item/:id', AppController.delItem)
route.get('/item/:id', AppController.getItemById)
route.put('/item/:id', AppController.updateItem)

route.post('/category', AppController.createCategory)
route.get('/category', AppController.getCategory)
route.delete('/category/:id', AppController.delCategory)


module.exports = route