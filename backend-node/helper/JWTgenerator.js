const jwt = require("jsonwebtoken")

const accessTokenGenerator = async (id , email) => {
    try {
        const token = jwt.sign({
            id,
            email
        } , process.env.JWT_ACCESS_SECRET , {algorithm : "HS512" , expiresIn: "30s"});

        return token;
    } catch (error) {
        throw error;
    }
}


const refreshTokenGenerator = async (id , email) => {
    try {
        const token = jwt.sign({
            id,
            email
        } , process.env.JWT_REFRESH_SECRET , {algorithm : "HS512" , expiresIn: "7d"});

        return token;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    accessTokenGenerator,
    refreshTokenGenerator
}