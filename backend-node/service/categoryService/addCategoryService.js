const categoryModel = require("../../model/categoryModel");
const emojiRegex = require('emoji-regex')();

const addCategoryService = async (userId, categoryName, categoryEmoji) => {
    try {
        const isSafe = validateCategory(categoryName, categoryEmoji);
        if(!isSafe.status) {
            return isSafe;
        }
        const newCategory = new categoryModel({
            categoryName,
            categoryEmoji,
            userId
        });
        console.log(newCategory)
        const savedCategory = await newCategory.save();
        isSafe.data = savedCategory;
        return isSafe;
    } catch (error) {
        throw error;
    }
}

const validateCategory = (categoryName, categoryEmoji) => {
    if(typeof categoryName !== 'string' && categoryName.length() < 3) {
        return {
            status : false,
            data : null,
            error : 'Category name is invalid'
        };
    }
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
        data : {
            categoryName,
            categoryEmoji
        },
        error : null
    }; 
}

module.exports = addCategoryService;