const express = require('express')
const router = express.Router()
const adminRouter = require('./adminRoute');
const custRouter = require('./userRoute');

router.use('/', adminRouter)
router.use('/cust', custRouter)




module.exports = router;