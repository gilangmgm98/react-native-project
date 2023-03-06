const { comparePassword, createToken } = require('../helper/helper');
const { User, Item, Category, Ingredient, sequelize } = require('../models/index')
class adminController {
    static async register(req, res, next) {
        try {
            const { username, email, password, phoneNumber, address } = req.body;

            if (!password) {
                throw { name: "Password is required" };
            }

            const user = await User.create({
                username,
                email,
                password,
                phoneNumber,
                address,
                role: "admin",
            });

            res.status(201).json({ id: user.id, email: user.email });

        } catch (error) {
            next(error);
        }
    }

    static async login(req, res, next) {
        try {
            const { email, password } = req.body;

            if (!email) {
                throw {
                    name: "Email is required",
                };
            }

            if (!password) {
                throw {
                    name: "Password is required",
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
                let access_token = createToken({
                    id,
                    email,
                });

                res.status(200).json({ access_token });
            }
        } catch (error) {
            next(error);
        }
    }

    static async createItem(req, res, next) {
        const t = await sequelize.transaction()
        try {
            const { name, description, price, categoryId, ingredient, imgUrl } = req.body
            const item = await Item.create({
                name,
                description,
                price,
                categoryId,
                authorId: 1,
                imgUrl,
                mongoId: "63fb017a226dc158d6d59281"

            }, { transaction: t });
            let array = []
            if (Array.isArray(ingredient)) {
                ingredient.map(el => {
                    let obj = {}
                    obj.itemId = item.id,
                        obj.name = el
                    array.push(obj)
                })
            } else {
                let obj = {}
                obj.itemId = item.id,
                    obj.name = el
                array.push(obj)

            }
            await Ingredient.bulkCreate(array, { transaction: t })


            await t.commit()

            res.status(201).json({ item, array });
        } catch (error) {
            console.log(error);
            await t.rollback()
            next(error)
        }
    }

    static async getAllItem(req, res, next) {
        try {
            const items = await Item.findAll({
                attributes: {
                    exclude: ["createdAt", "updatedAt"]
                },
                include: [
                    {
                        model: Ingredient,
                        attributes: {
                            exclude: ["createdAt", "updatedAt"]
                        }
                    },
                    {
                        model: Category,
                        attributes: {
                            exclude: ["createdAt", "updatedAt"]
                        }
                    }
                ]
            });
            res.status(200).json(items);
        } catch (error) {
            // console.log(error, 'ini error');
            next(error);
        }
    }

    static async getItemById(req, res, next) {
        try {
            const items = await Item.findOne({
                attributes: {
                    exclude: ["createdAt", "updatedAt"]
                },
                include: [
                    {
                        model: Ingredient,
                        attributes: {
                            exclude: ["createdAt", "updatedAt"]
                        },
                    },
                    {
                        model: Category,
                        attributes: {
                            exclude: ["createdAt", "updatedAt"]
                        }
                    }
                ],
                where: {
                    id: req.params.id,
                },
            });
            res.status(200).json(items);
        } catch (error) {
            // console.log(error, 'ini error');
            next(error);
        }
    }

    static async deleteItem(req, res, next) {
        try {
            const { id } = req.params;
            const item = await Item.destroy({

                where: {
                    id: id,
                },
            });
            res.status(200).json({message: 'Success Delete Food'});
        } catch (error) {
            next(error)
        }
    }

    static async updateItem(req, res, next) {
        const t = await sequelize.transaction()
        try {
            const { id } = req.params;
            console.log(req.body);
            const { name, description, price, imgUrl, categoryId, ingredient } = req.body;
            const authorId = 1;

            const deleteIngredient = await Ingredient.destroy({ where: { itemId: id } }, { transaction: t })
            console.log(name,
                description,
                price,
                imgUrl,
                categoryId,
                authorId);
            const item = await Item.update({
                name,
                description,
                price,
                imgUrl,
                categoryId,
                authorId,
            }, {
                where: {
                    id: id,
                },
            }, { transaction: t });
            let tempIngredient = []
            let dataIngredient = ingredient.map(el => {
                let tempObj = {}
                tempObj.itemId = id
                tempObj.name = el
                tempIngredient.push(tempObj)
            })

            await Ingredient.bulkCreate(tempIngredient, {
                where: { itemId: id },
                updateOnDuplicate: ["itemId"]
            }, { transaction: t });

            await t.commit()

            res.status(200).json({ message: 'updated successfully' });
        } catch (error) {
            next(error)
        }
    }

    static async createCategory(req, res, next) {
        try {
            const createCategory = await Category.create(req.body);
            const category = await Category.findOne({
                where: {id: createCategory.id},
                attributes: {
                    exclude: ['createdAt','updatedAt']
                }
            })
            // console.log(category);
            res.status(201).json(category);
        } catch (error) {
            next(error)
        }
    }

    static async getAllCategory(req, res, next) {
        try {
            const categories = await Category.findAll({
                attributes: {
                    exclude: ['createdAt','updatedAt']
                }
            });
            res.status(200).json(categories);
        } catch (error) {
            next(error)
        }
    }

    static async deleteCategory(req, res, next) {
        try {
            const { id } = req.params;
            const category = await Category.destroy({
                where: {
                    id: id,
                },
            });
            res.status(200).json(category);
        } catch (error) {
            next(error)
        }
    }
}


module.exports = adminController