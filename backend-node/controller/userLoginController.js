const loginService = require("../service/userService/userLoginService");

const login = async (req , res , next) => {
    try {
        const { email , password } = req.body;
        const response = await loginService(email , password);
        if(!response.status) {
            if(response.err === "User not found") {
                res.status(404).json(response);
            } else {
                res.status(401).json(response);
            }
        } else {
            res.status(200).json(response);
        }
    } catch (error) {
        next(error);
    }
}

module.exports = login;
