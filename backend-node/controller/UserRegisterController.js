const registerService = require("../service/userService/userRegisterService");

const register = async (req , res  , next) => {
    try {
        const { userName , email , password } = req.body;
        const response  = await registerService(userName , email , password);
        if(response.status) {
            res.status(201).json(response);
        } else {
            res.status(400).json(response);
        }
    } catch (error) {
        next(error);
    }

}

module.exports = register;