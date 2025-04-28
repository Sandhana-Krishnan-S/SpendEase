const updateCategoryService = require("../../service/categoryService/updateCategoryService");

const updateCategoryController = async (req , res , next) => {
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
        const { categoryName, categoryEmoji } = req.body;
        const response = await updateCategoryService(userId , categoryId , categoryName , categoryEmoji);
        if(!response.status) {
            res.status(400).json(response);
            return;
        }
        res.status(201).json(response);
        return;
    } catch (error) {
        next(error);
    }
}

module.exports = updateCategoryController;