const bcrypt = require('bcryptjs');

function hash(password) {
    const salt = bcrypt.genSaltSync(8)
    const hash = bcrypt.hashSync(password, salt)
    return hash
}

function comparePass(password, hashPass) {
    return bcrypt.compareSync(password, hashPass)
}

module.exports = { hash, comparePass }