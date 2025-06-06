const { userNameValidate, emailValidate, passwordValidate } = require("../../helper/userValidation");
const userModel = require("../../model/userModel");
const sendMailAuth = require("./mailAuthSender");

const register = async (userName , email , password) => {
    try {
        const isVerified = false;
        const existingUser = await userModel.findOne({email});
        if(existingUser) {
            return {
                status : false,
                data : null,
                error : "User is alredy registered"
            }
        }
        const isValid = userValidate(userName , email , password);
        if(!isValid.status) {
            return isValid;
        }
        const newUser = new userModel({
            userName,
            email,
            password,
            isVerified
        });
        const savedUser = await newUser.save();
        isValid.data = savedUser;
        sendMailAuth(userName , email);
        return isValid;
    } catch (error) {
        throw error;
    }
} 

const userValidate = (userName , email , password) => {
    const userValid = userNameValidate(userName);
    if(!userValid.status) {
        return userValid;
    }
    const emailValid = emailValidate(email);
    if(!emailValid.status) {
        return emailValid;
    }
    const passwordValid = passwordValidate(password);
    if(!passwordValid.status) {
        return passwordValid;
    }
    return {
        status : true,
        data : {userName , email , password},
        error : null
    };
} 

module.exports = register;