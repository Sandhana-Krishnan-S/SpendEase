const userNameValidate = (userName) => {
    userName = userName.trim();
    if(userName.length < 3 || userName.length > 15) {
        return {
            status : false,
            data : null,
            err : "Username must have 3 to 15 characters"
        };
    }
    return {
        status : true,
        data : userName,
        err : null
    }
}

const emailValidate = (email) => {
    email = email.trim();
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if(!emailRegex.test(email)) {
        return {
            status : false,
            data : null,
            err : "Invalid Email Id"
        };
    }
    return {
        status : true,
        data : email,
        err : null
    }
}

const passwordValidate = (password) => {
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
        data : password,
        err : null
    }
}

module.exports = {
    userNameValidate,
    emailValidate,
    passwordValidate
}