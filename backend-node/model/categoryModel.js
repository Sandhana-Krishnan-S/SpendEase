const { default: mongoose } = require("mongoose");

const categorySchema = mongoose.Schema({
    categoryName : {
        type : String,
        required : true
    },
    categoryEmoji : {
        type : String,
        required : true
    },
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'users',
        default : null
    }
});

const categoryModel = mongoose.model('category' , categorySchema);

module.exports = categoryModel;