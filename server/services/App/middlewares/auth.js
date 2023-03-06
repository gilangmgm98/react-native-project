const { decodeToken } = require("../helper/helper");
const { User } = require("../models/index");


const authentication = async (req, response, next) => {
    try {
        console.log(req.headers, 'Ini dia access_token');
        const access_token = req.headers.access_token;
        // console.log(access_token,"Ini dia<<");
        if (!access_token) {
            throw {
                name: "InvalidToken",
            };
        }
        console.log('Masuk sini');
        const data = decodeToken(access_token);
        const user = await User.findOne({
            where: {
                id: data.id,
            },
        });

        // console.log(user,'<<<Ini User');
        if (!user) {
            throw {
                name: "InvalidToken",
            };
        }
        console.log("atas user");
        req.user = user;

        next();

    } catch (error) {
        console.log(error);
        response.status(401).json(error)
    }
};


module.exports = {
    authentication
};