const jwt = require("jsonwebtoken");
const userModel = require("../model/userModel");
const { accessTokenGenerator, refreshTokenGenerator, mailAuthGenerator } = require("../helper/JWTgenerator");


const verifyAccess = async (req , res , next) => {
    try {
        const token = req.headers.authorization;
        if(!token || !token.startsWith("Bearer ")) {
            return next({
                status: 401,
                message: "Access Denied. No token provided."
            });
        }
        const accessToken = token.split(" ")[1];
        const decode = jwt.verify(accessToken , process.env.JWT_ACCESS_SECRET);
        const user = await userModel.findById(decode.id);
        if (!user) {
            return next({
                status: 404,
                message: "User not found. Token is invalid."
            });
        }
        req.user = user; 
        next();
    } catch (error) {
        return next({
            status : 403, 
            message : "Invalid or expired token."

        });
    }
}

const verifyRefresh = async (token) => {
    try {
        if(!token || !token.startsWith("Bearer ")) {
            return {
                status: false,
                data : null,
                error: "Access Denied. No token provided."
            };
        }
        const refreshToken = token.split(" ")[1];
        const decode = jwt.verify(refreshToken , process.env.JWT_REFRESH_SECRET);
        const user = await userModel.findById(decode.id);
        if (!user) {
            return {
                status: false,
                data : null,
                error: "User not found. Token is invalid."
            };
        }
        return {
            status : true,
            data : user,
            error : null
        };
    } catch (error) {
        throw error;
    }
}


const verifyMailAuth = async (token) => {
    try {
        const decode = jwt.verify(token , process.env.JWT_MAILAUTH_SECRET);
        const user = await userModel.findByEmail(decode.email);
        if (!user) {
            return {
                status: false,
                data : null,
                error: "User not found. Token is invalid."
            };
        }
        return {
            status : true,
            data : user,
            error : null
        };
    } catch (error) {
        throw error;
    }
}


const generateNewJWT = async (id , email) => {
    try {   
        const accessToken = await accessTokenGenerator(id , email);
        const refreshToken = await refreshTokenGenerator(id , email);
        return {accessToken , refreshToken};
    } catch (error) {
        throw error;
    }
}

const mailAuthToken = async (name , email) => {
    try {   
        const token = await mailAuthGenerator(name , email);
        return token
    } catch (error) {
        throw error;
    }
}

module.exports = {
    verifyAccess,
    verifyRefresh,
    generateNewJWT,
    mailAuthToken,
    verifyMailAuth
};