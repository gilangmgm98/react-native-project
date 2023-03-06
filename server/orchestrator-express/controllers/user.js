const axios = require("axios");
const API_USER = 'http://localhost:4001/users'
const Redis = require('ioredis');
const redis = new Redis({
    port: '17552',
    host: 'redis-17552.c252.ap-southeast-1-1.ec2.cloud.redislabs.com',
    password: 'vPaDZKrLb5pDqyZD3gspPGu5lgKbpVEB',
    username: 'default'
})


class UserController {
    static async getUsers(req, res) {
        try {
            let cacheData = JSON.parse(await redis.get('users'))
            if (cacheData) {
                res.status(200).json(cacheData)
            } else {
                const response = await axios({
                    method: 'GET',
                    url: `${API_USER}`
                })

                const { data } = response

                await redis.set('users', JSON.stringify(data))

                res.status(200).json(data)
            }
        } catch (error) {
            // console.log(error);
            res.status(error.status).json({ message: error.message })
        }
    }

    static async getUsersById(req, res) {
        try {
            const { id } = req.params

            const response = await axios({
                method: 'GET',
                url: `${API_USER}/${id}`
            })

            const { data } = response


            res.status(200).json(data)
        } catch (error) {
            console.log(error);
            // res.status(error.response.status).json(error.response.data)
        }
    }

    static async createUser(req, res) {
        try {
            const { username, email, password, phoneNumber, address } = req.body

            const { data } = await axios({
                method: 'POST',
                url: `${API_USER}`,
                data: { username, email, password, phoneNumber, address }
            })

            await redis.del('users')

            res.status(201).json(data)
        } catch (error) {
            res.status(error.response.status).json(error.response.data)
        }
    }

    static async destroyUser(req, res) {
        try {
            const { id } = req.params
            const { data } = await axios({
                method: 'DELETE',
                url: `${API_USER}/${id}`
            })

            await redis.del('users')

            res.status(200).json(data)
        } catch (error) {
            res.status(error.response.status).json(error.response.data)
        }
    }
}

module.exports = UserController