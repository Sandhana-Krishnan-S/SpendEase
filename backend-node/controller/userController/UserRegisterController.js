const { generateNewJWT } = require("../../middlewares/tokenAuth");
const registerService = require("../../service/userService/userRegisterService");

const register = async (req , res  , next) => {
    try {
        const { userName , email , password } = req.body;
        const response  = await registerService(userName , email , password);
        if(response.status) {
            const tokens = await generateNewJWT(response.data._id , response.data.email);
            res.status(200).json({
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
        } else {
            res.status(400).json(response);
        }
    } catch (error) {
        next(error);
    }

}

module.exports = register;