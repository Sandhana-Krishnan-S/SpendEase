const { default: mongoose } = require("mongoose");
const bcrypt = require('bcrypt');


const userSchema = new mongoose.Schema({
    userName : {
        type : String,
        required : true
    }, 
    email : {
        type : String,
        lowercase : true,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    },
    isVerified : {
        type : Boolean,
        required : true
    },
    categoryCount : {
        type : Number,
        required : true,
        default : 0
    }
});

userSchema.pre('save' , async function() {
    try {
        var user = this;
        const salt = await(bcrypt.genSalt(10));
        const hashpass = await bcrypt.hash(user.password , salt);

        user.password = hashpass;
    } catch (error) {
        throw error;
    }
})

userSchema.methods.compare = async function (userPass) {
    try {
        const isMatch = await bcrypt.compare(userPass , this.password);
        return isMatch;
    } catch (error) {
        throw error;
    }
}

userSchema.statics.findByEmail = function(email) {
    return this.findOne({ email });
}

userSchema.static.findById = function(_id) {
    return this.findOne({ _id });
}

const userModel = mongoose.model('users' , userSchema);

module.exports = userModel;