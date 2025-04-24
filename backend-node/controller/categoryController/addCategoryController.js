const addCategoryService = require("../../service/categoryService/addCategoryService");

const addCategoryController = async (req , res , next) => {
    try {
        const user = req.user;
        if(!user) {
            res.status(401).json({
                status : false,
                data : null,
                error : 'User is not autherised'
            });
        }
        const userId = user._id;
        const { categoryName, categoryEmoji } = req.body;
        const response = await addCategoryService(userId, categoryName, categoryEmoji);
        if(!response.status) {
            res.status(400).json(response);
        }
        res.status(201).json(response);
    } catch (error) {
        next(error);
    }
}

module.exports = addCategoryController;