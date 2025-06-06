const { verifyMailAuth } = require("../../middlewares/tokenAuth");
const userModel = require("../../model/userModel");

const verifyMail = async (token) => {
    try {
        const response = await verifyMailAuth(token);
        if(!response.status) {
            return response;
        }
        const user = response.data;
        await userModel.findByIdAndUpdate(user._id, { isVerified: true });

        return {
            status : true,
            data : "Email verified successfully.",
            error : null
        }
        
    } catch (error) {
        throw error;
    }
}

module.exports = verifyMail;