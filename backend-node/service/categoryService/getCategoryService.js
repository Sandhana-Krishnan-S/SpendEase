const categoryModel = require("../../model/categoryModel");

const getCategoryService = async (userId) => {
    try {
        const data = await categoryModel.findByUserId(userId);
        return {
            status : true,
            data,
            error : null
        }
    } catch (error) {
        throw(error);
    }
}

module.exports = getCategoryService;