const { verifyRefresh, generateNewJWT } = require("../../middlewares/tokenAuth");

const jwtRefresh = async (token) => {
    try {
        const isGood = await verifyRefresh(token);
        if(!isGood.status) {
            return isGood;
        }
        const user = isGood.data;
        const tokens = await generateNewJWT(user.id , user.email);
        return {
            status : true,
            data : {
                user,
                tokens
            },
            error : null
        };
    } catch (error) {
        throw error;
    }
}

module.exports = jwtRefresh;