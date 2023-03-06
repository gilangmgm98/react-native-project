const express = require('express');
const app = express()
const port = 4000
const cors = require('cors');
const userRoute = require('./routes/user');
const appRoute = require('./routes/app');

app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use('/users', userRoute)
app.use(appRoute)

app.listen(port, () => {
    console.log(`🚀🚀🚀 Running on orchestra-express, in port ${port}`);
})