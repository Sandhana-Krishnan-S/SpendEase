const sendMailAuth = require("../../service/userService/mailAuthSender");

// TODO: Add rate limiting to this resend route (max 3 times, cooldown 10min)
const resendMailAuthController = async (req , res , next) => {
    try {
        const user = req.user;
        sendMailAuth(user.userName , user.email);

        res.status(200).json({
            status : true,
            data : "email sent successfully",
            error : null
        })
    } catch (error) {
        next(error);
    }
}

module.exports = resendMailAuthController;