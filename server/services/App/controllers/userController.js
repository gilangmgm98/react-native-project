const { hash, comparePassword, decodeToken } = require('../helper/helper');
const { User, Item } = require('../models/index')
class userController {

    static async register(req, response) {
        try {
            const { username, email, password, phoneNumber, address} = req.body;

            if (!password) {
                throw { required: "Password is Required" };
            }

            const user = await User.create({
                username,
                email,
                password: hash(password),
                phoneNumber,
                address,
                role: "user",
            });

            response.status(201).json({ id: user.id, email: user.email });

        } catch (error) {
            console.log(error);

            if (error.name === "SequelizeValidationError") {
                response.status(400).json(error.errors[0].message);
            } else if (error.required) {
                response.status(400).json(error);
            } else if (error.name === "SequelizeUniqueConstraintError") {
                response.status(400).json(error.errors[0].message);
            } else {
                response.status(500).json(error.message);
            }
        }
    }

    static async login(req, response) {
        try {
            const { email, password } = req.body;

            if (!email) {
                throw {
                    name: "required email",
                };
            }

            if (!password) {
                throw {
                    name: "required password",
                };
            }

            let user = await User.findOne({
                where: {
                    email: email,
                },
            });

            if (!user) {
                throw {
                    name: "Invalid Login",
                };
            }

            let compareResult = comparePassword(password, user.password);

            if (!compareResult) {
                throw {
                    name: "Invalid Login",
                };
            } else {
                const { id, email } = user;
                let token = decodeToken({
                    id,
                    email,
                });

                console.log(token);

                response.status(200).json({token});
            }
        } catch (error) {
            response.status(401).json(error)
        }
    }

    static async getAllItem(req, res) {
        try {
            const items = await Item.findAll();
            res.status(200).json(items);
        } catch (error) {
            res.status(500).json(error);
        }
    }

    static async getDetailItem(req, res) {
        try {
            const { id } = req.params;
            const item = await Item.findOne({where: {id}})

            res.status(200).json(item);
        } catch (error) {
            res.status(500).json(error);
        }
    }
}


module.exports = userController