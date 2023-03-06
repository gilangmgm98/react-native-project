const express = require('express');
const userController = require('../controllers/userController');
const { authentication } = require('../middlewares/auth');
const custRouter = express.Router();

custRouter.post('/register', userController.register)
custRouter.post('/login', userController.login)
// custRouter.use(authentication)
custRouter.get('/item', userController.getAllItem)
custRouter.get('/item/:id', userController.getDetailItem)


module.exports = custRouter;