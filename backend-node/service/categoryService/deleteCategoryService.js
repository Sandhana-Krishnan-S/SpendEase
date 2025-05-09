const categoryModel = require("../../model/categoryModel");
const userModel = require("../../model/userModel");

const deleteCategoryService = async (userId, categoryId) => {
    try {
        const category = await categoryModel.findByIdWithUser(categoryId , userId);
        if(!category) {
            return {
                status : false,
                data : null,
                error : "Category not found"
            }
        }
        category.isDeleted = true;
        const updated = await category.save();
        const user = await userModel.findById(userId);
        user.categoryCount -=  1;
        await user.updateOne({ categoryCount: user.categoryCount });
        return {
            status : true,
            data : updated,
            error : null
        };
    } catch (error) {
        if(error.message.startsWith("Cast to ObjectId failed for value")) {
            return {
                status : false,
                data : null,
                error : "Category not found"
            };
        }
        throw(error);
    }
}

module.exports = deleteCategoryService;