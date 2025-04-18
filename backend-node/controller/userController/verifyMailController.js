const verifyMailService = require("../../service/userService/verifyMailService");


const verifyMail = async (req , res , next) => {
    try {
        const token = req.query.token;
        const response = await verifyMailService(token);
        if(!response.status) {
            res.status(401).json(response);
        }
        res.status(200).json(response);
    } catch (error) {
        if (error.message && error.message == "jwt expired") {
            res.status(401).json({
                status : false,
                data : null,
                error : "invalid or expired token"
            });
        }
        next(error);
    }
}

module.exports = verifyMail;