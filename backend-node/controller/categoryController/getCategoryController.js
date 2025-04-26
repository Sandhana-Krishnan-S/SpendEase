const getCategoryService = require("../../service/categoryService/getCategoryService");

const getCategoryController = async (req , res , next) => {
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
        const response = await getCategoryService(userId);
        if(!response.status) {
            res.status(400).json(response);
            return;
        }
        res.status(200).json(response);
        return;
    } catch (error) {
        next(error);
    }
}

module.exports = getCategoryController;