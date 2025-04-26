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
    isDeleted : {
        type : Boolean,
        required : true,
        default : false
    },
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'users',
        default : null
    }
});

categorySchema.statics.findByCategoryName = function(categoryName, userId, isDeleted) {
    return this.findOne({ categoryName, userId, isDeleted });
}

categorySchema.statics.findByCategoryEmoji = function(categoryEmoji, userId, isDeleted) {
    return this.findOne({ categoryEmoji, userId, isDeleted });
}

categorySchema.statics.findByUserId = function(userId) {
    return this.find({ userId });
}

const categoryModel = mongoose.model('category' , categorySchema);

module.exports = categoryModel;