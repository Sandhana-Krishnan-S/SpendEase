const sendMailAuthHandler = require("../../middlewares/authMailer");

const sendMailAuth = async (username , email) => {
    try {
        sendMailAuthHandler(username , email);
    } catch(error) {
        throw error;
    }
}

module.exports = sendMailAuth;