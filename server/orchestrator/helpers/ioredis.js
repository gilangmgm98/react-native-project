const Redis = require('ioredis');
const redis = new Redis({
    port: '17552',
    host: process.env.HOST_REDIS,
    password: process.env.PASSWORD_REDIS,
    username: 'default'
})

module.exports = redis