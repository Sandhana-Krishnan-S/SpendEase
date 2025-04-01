const userModel = require("../../model/userModel");

const register = async (userName , email , password) => {
    try {
        const existingUser = await userModel.findOne({email});
        if(existingUser) {
            return {
                status : false,
                data : null,
                err : "User is alredy registered"
            }
        }
        const isValid = userValidate(userName , email , password);
        if(!isValid.status) {
            return isValid;
        }
        const newUser = new userModel({
            userName,
            email,
            password
        });
        const savedUser = await newUser.save();
        isValid.data = savedUser;
        return isValid;
    } catch (error) {
        throw error;
    }
} 

const userValidate = (userName , email , password) => {
    userName = userName.trim();
    email = email.trim();
    if(userName.length < 3 || userName.length > 15) {
        return {
            status : false,
            data : null,
            err : "Username must have 3 to 15 characters"
        };
    }
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if(!emailRegex.test(email)) {
        return {
            status : false,
            data : null,
            err : "Invalid Email Id"
        };
    }
    const passwordRegex = /^.{8,15}$/;
    if(!passwordRegex.test(password)) {
        return {
            status : false,
            data : null,
            err : "Password must contain 8 to 15 characters"
        };
    }

    return {
        status : true,
        data : {userName , email , password},
        err : null
    }
} 

module.exports = register;