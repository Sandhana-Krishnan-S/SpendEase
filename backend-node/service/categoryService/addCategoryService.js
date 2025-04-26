const { categoryNameValidate, categoryEmojiValidate } = require("../../helper/categoryValidation");
const categoryModel = require("../../model/categoryModel");

const addCategoryService = async (userId, categoryName, categoryEmoji) => {
    try {
        const isSafe = validateCategory(categoryName, categoryEmoji, userId);
        if(!isSafe.status) {
            return isSafe;
        }
        const isExist = await checkIfExists(categoryName, categoryEmoji, userId);
        if(!isExist.status) {
            return isExist;
        }
        const newCategory = new categoryModel({
            categoryName,
            categoryEmoji,
            userId
        });
        console.log(newCategory)
        const savedCategory = await newCategory.save();
        return {
            status: true,
            data: savedCategory,
            error: null
        };        
    } catch (error) {
        throw error;
    }
}

const checkIfExists = async (categoryName, categoryEmoji, userId) => {
    try {
        isNameExists = await categoryModel.findByCategoryName(categoryName, userId, false);
        if(isNameExists) {
            return {
                status : false,
                data : null,
                error : `Category with the name : ${categoryName} already exists`
            };
        }
        isEmojiExists = await categoryModel.findByCategoryEmoji(categoryEmoji, userId, false);
        if(isEmojiExists) {
            return {
                status : false,
                data : null,
                error : `Category with the Emoji : ${categoryEmoji} already exists`
            };
        }

        return {
            status : true,
            data : 'safe to add',
            error : null
        };
    } catch (error) {
        throw(error);
    }
}

const validateCategory = (categoryName, categoryEmoji) => {
    const categoryNameCheck = categoryNameValidate(categoryName);
    if(!categoryNameCheck.status) {
        return categoryNameCheck;
    }
    const categoryEmojiCheck = categoryEmojiValidate(categoryEmoji);
    if(!categoryEmojiCheck.status) {
        return categoryEmojiCheck;
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