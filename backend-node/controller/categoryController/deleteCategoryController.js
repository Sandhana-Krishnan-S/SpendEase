const { default: mongoose } = require("mongoose");
const deleteCategoryService = require("../../service/categoryService/deleteCategoryService");

const deleteCategoryController = async(req , res , next) => {
    try {
        const user = req.user;
        if(!user) {
            res.status(401).json({
                status : false,
                data : null,
                error : 'User is not autherised'
            });
            return;
        }
        const userId = user._id;
        const categoryId = req.query.categoryId;
        const response = await deleteCategoryService(userId , categoryId);
        if(!response.status) {
            res.status(400).json(response);
            return;
        }
        res.status(200).json(response);
    } catch (error) {
        next(error);
    }
}

module.exports = deleteCategoryController;