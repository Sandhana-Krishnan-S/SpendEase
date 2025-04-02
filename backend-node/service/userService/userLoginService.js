const { emailValidate, passwordValidate } = require("../../helper/userValidation");
const userModel = require("../../model/userModel");

const login = async (email , password) => {
    try {
        const isValid = userValidate(email , password);
        if(!isValid.status) {
            return isValid;
        }
        const user = await userModel.findOne({ email });
        if(user == null) {
            return {
                status : false,
                data : null,
                err : "User not found"
            };
        }
        const comparePassword = await user.compare(password);
        if(!comparePassword) {
            return {
                status : false,
                data : null,
                err : "Invalid credentials"
            };
        }
        return {
            status : true,
            data : user,
            err : null
        };
    } catch (error) {
        throw error;
    }
}

const userValidate = (email) => {
    const emailValid = emailValidate(email);
    if(!emailValid.status) {
        return emailValid;
    }
    return {
        status : true,
        data : email,
        err : null
    };
}

module.exports = login;