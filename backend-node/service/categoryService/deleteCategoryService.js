const categoryModel = require("../../model/categoryModel");

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