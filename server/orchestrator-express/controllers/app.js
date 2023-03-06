const axios = require("axios");
const API_USER = 'http://localhost:4001/user'
const API_APP = 'http://localhost:4002'
const Redis = require('ioredis');
const redis = new Redis({
    port: '17552',
    host: 'redis-17552.c252.ap-southeast-1-1.ec2.cloud.redislabs.com',
    password: 'vPaDZKrLb5pDqyZD3gspPGu5lgKbpVEB',
    username: 'default'
})

class AppController {
    static async getAllItem(req, res) {
        try {

            const cacheData = JSON.parse(await redis.get('foods'))

            if (cacheData) {
                res.status(200).json(cacheData)
            } else {
                const { data } = await axios({
                    method: 'GET',
                    url: `${API_APP}/item`
                })

                await redis.set('foods', JSON.stringify(data))

                res.status(200).json(data)
            }
        } catch (error) {
            res.status(500).json({ message: 'Internal Server Error' })
            console.log(error);
        }
    }

    static async getItemById(req, res) {
        try {
            const { id } = req.params

            const { data } = await axios({
                method: 'get',
                url: `${API_APP}/item/${id}`
            })

            res.status(200).json(data)
        } catch (error) {
            // console.log(error);
            res.status(500).json({ message: 'Internal Server Error' })
        }
    }

    static async createItem(req, res) {
        try {
            const { name, description, price, categoryId, ingredient, imgUrl } = req.body

            const { data } = await axios({
                method: 'post',
                url: `${API_APP}/item`,
                data: { name, description, price, categoryId, ingredient, imgUrl }
            })

            await redis.del('foods')

            res.status(201).json(data)

        } catch (error) {
            res.status(500).json('Internal Server Error')
        }
    }

    static async delItem(req, res) {
        try {
            const { id } = req.params

            const { data } = await axios({
                method: 'delete',
                url: `${API_APP}/item/${id}`
            })

            await redis.del('foods')

            res.status(200).json({ message: 'Food Deleted' })
        } catch (error) {
            res.status(500).json({ message: 'Internal Server Error' })
        }
    }

    static async updateItem(req, res) {
        try {
            const { id } = req.params
            const { name, description, price, categoryId, ingredient, imgUrl } = req.body

            const { data } = await axios({
                method: 'put',
                url: `${API_APP}/item/${id}`,
                data: { name, description, price, categoryId, ingredient, imgUrl }
            })

            await redis.del('foods')

            res.status(200).json(data)

        } catch (error) {
            res.status(500).json({ message: 'Internal Server Error' })
        }
    }

    static async createCategory(req, res) {
        try {
            const { name } = req.body

            const { data } = await axios({
                method: 'post',
                url: `${API_APP}/category`,
                data: { name }
            })

            await redis.del('categories')

            res.status(201).json(data)
        } catch (error) {
            res.status(500).json({ message: `Internal Server Error` })
        }
    }

    static async getCategory(req, res) {
        try {
            const dataCache = await redis.get('categories')

            if (dataCache) {
                res.status(200).json(JSON.parse(dataCache))
            } else {
                const { data } = await axios({
                    method: 'get',
                    url: `${API_APP}/category`
                })

                await redis.set('categories', JSON.stringify(data))

                res.status(200).json(data)
            }
        } catch (error) {
            res.status(500).json({ message: 'Internal Server Error' })
        }
    }

    static async delCategory(req, res) {
        try {
            const { id } = req.params

            const { data } = await axios({
                method: 'delete',
                url: `${API_APP}/category/${id}`
            })

            await redis.del('categories')

            res.status(200).json({ message: 'Success Delete Category' })
        } catch (error) {
            res.status(500).json({ message: 'Internal Server Error`' })
        }
    }
}

module.exports = AppController