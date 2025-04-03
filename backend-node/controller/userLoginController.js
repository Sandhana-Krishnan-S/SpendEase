const { accessTokenGenerator, refreshTokenGenerator } = require("../helper/JWTgenerator");
const { generateNewJWT } = require("../middlewares/tokenAuth");
const loginService = require("../service/userService/userLoginService");

const login = async (req , res , next) => {
    try {
        const { email , password } = req.body;
        const response = await loginService(email , password);
        if(!response.status) {
            if(response.error === "User not found") {
                res.status(404).json(response);
            } else {
                res.status(401).json(response);
            }
        } else {
            const tokens = await generateNewJWT(response.data._id , response.data.email);
            res.status(201).json({
                status : true,
                data : {
                    user: {
                        id: response.data._id,
                        email: response.data.email,
                        name: response.data.userName
                    },
                    tokens
                },
                error : null
            });
        }
    } catch (error) {
        next(error);
    }
}

module.exports = login;
