const { getDatabase } = require('../config/mongoConnection');
const { ObjectId } = require('mongodb');
const User = require('../models/user');

class Controller {

    static async findAllUser(req, res) {
        try {
            const data = await User.findAll()

            res.status(200).json({
                statusCode: 200,
                message: 'Success Get All Data',
                data
            })
            console.log(data);
            // res.status(200).json(data)
        } catch (error) {
            console.log(error);
            res.status(500).json({message: 'Internal Server Error'})
        }
    }

    static async register(req, res) {
        try {
            const { username, email, password, address, phoneNumber } = req.body

            const newUser = await User.createUser({ username, email, password, address, phoneNumber })

            res.status(201).json({
                statusCode: 201,
                message: 'Success Create New User',
                id: newUser.insertedId,
                username,
                email
            })
        } catch (error) {
            res.status(500).json({message: 'Internal Server Error'})
        }
    }

    static async findUserById(req, res) {
        try {
            const { id } = req.params

            const foundUser = await User.findById(id)

            res.status(200).json({
                statusCode: 200,
                message: 'Success find user by id',
                foundUser
            })
        } catch (error) {
            res.status(500).json({ message: 'Internal Server Error' })
        }
    }

    static async deleteUser(req, res) {
        try {
            const { id } = req.params

            const wantToDelUser = await User.deleteById(id)
            
            res.status(200).json({
                statusCode: 200,
                message: 'Success Delete User',
                wantToDelUser
            })
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Internal Server Error' })
        }
    }

}

module.exports = Controller