const jwt = require("jsonwebtoken")

const accessTokenGenerator = async (id , email) => {
    try {
        const token = jwt.sign({
            id,
            email
        } , process.env.JWT_ACCESS_SECRET , {algorithm : "HS512" , expiresIn: "30m"});

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

const mailAuthGenerator = async (id , email) => {
    try {
        const token = jwt.sign({
            id,
            email
            // 10 mins
        } , process.env.JWT_MAILAUTH_SECRET , {algorithm : "HS512" , expiresIn: '10m'});

        return token;
    } catch (error) {
        throw error;
    }
}


module.exports = {
    accessTokenGenerator,
    refreshTokenGenerator,
    mailAuthGenerator
}