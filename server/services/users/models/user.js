const { ObjectId } = require('mongodb');
const { getDatabase } = require('../config/mongoConnection');
const { hash, comparePass } = require('../helpers/bcrypt');

class User {

    static getCollections() {
        const db = getDatabase()
        const users = db.collection('users')
        return users
    }

    static async findAll() {
        return this.getCollections().find().toArray();
    }

    static async createUser(user) {
        return this.getCollections().insertOne({
            email: user.email,
            role: 'admin',
            password: hash(user.password),
            username: user.username,
            phoneNumber: user.phoneNumber,
            address: user.address
        })
    }

    static async findById(id) {
        return this.getCollections().findOne({
            _id: new ObjectId(id)
        })
    }

    static async deleteById(id) {
        return this.getCollections().deleteOne({
            _id: new ObjectId(id)
        })
    }

}



module.exports = User
