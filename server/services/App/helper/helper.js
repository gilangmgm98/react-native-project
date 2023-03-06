const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports = {
    hash: (password) => {
        const salt = bcryptjs.genSaltSync(10);
        const hash = bcryptjs.hashSync(password, salt);
        return hash
    },
    comparePassword: (password, hashPassword) => {
        return bcryptjs.compareSync(password, hashPassword);
    },
    createToken: (payload) => {
        return jwt.sign(payload, 'secret')
    },
    decodeToken: (token) => {
        return jwt.verify(token, 'secret')
    }
}