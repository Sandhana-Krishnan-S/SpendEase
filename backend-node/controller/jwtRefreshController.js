const jwtRefreshService = require("../service/userService/jwtRefreshService");

const jwtRefresh = async (req , res , next) => {
    try {
        const token = req.headers.authorization;
        const response = await jwtRefreshService(token);
        if(!response.status) {
            if(response.error == "User not found. Token is invalid.") {
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

module.exports = jwtRefresh;