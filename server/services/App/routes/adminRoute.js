const express = require('express');
const adminController = require('../controllers/adminController');
const { authentication } = require('../middlewares/auth');
const adminRouter = express.Router();

adminRouter.post('/login', adminController.login)
// adminRouter.use(authentication)
adminRouter.post('/register', adminController.register)
adminRouter.get('/item', adminController.getAllItem)
adminRouter.post('/item', adminController.createItem)
adminRouter.delete('/item/:id', adminController.deleteItem)
adminRouter.get('/item/:id', adminController.getItemById)
adminRouter.put('/item/:id', adminController.updateItem)
adminRouter.get('/category', adminController.getAllCategory)
adminRouter.post('/category', adminController.createCategory)
adminRouter.delete('/category/:id', adminController.deleteCategory)

module.exports = adminRouter;