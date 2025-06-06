const categoryModel = require('../model/categoryModel');

const emojiRegex = require('emoji-regex')();

const categoryNameValidate = (categoryName) => {
    if(typeof categoryName !== 'string' || categoryName.length < 3) {
        return {
            status : false,
            data : null,
            error : 'Category name is invalid'
        };
    }
    return {
        status : true,
        data : categoryName,
        error : null
    };
}

const categoryEmojiValidate = (categoryEmoji) => {
    const matches = categoryEmoji.match(emojiRegex);
    if(!matches || matches.length !== 1 || matches[0] !== categoryEmoji) {
        return {
            status : false,
            data : null,
            error : 'Category emoji is invalid'
        };
    }
    return {
        status : true,
        data : categoryEmoji,
        error : null
    };
}

const validateTransactionCategory = async (categoryId , userId) => {
    try {
        const category = await categoryModel.findByIdWithUser(categoryId , userId);
        if(!category || category.isDeleted) {
            return {
                status : false,
                data : null,
                error : "No such category found."
            }
        }        
        return {
            status: true,
            data: category,
            error: null
        };
    } catch (error) {
        throw error;
    }
}


module.exports = {
    categoryNameValidate,
    categoryEmojiValidate,
    validateTransactionCategory
};