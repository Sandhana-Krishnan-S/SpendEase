// get using pagination sorted by time desc - n per page
const getTransactionService = require("../../service/transactionService/getTransactionService");

const getTransactionController = async (req , res , next) => {
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
        const page = Math.max(1, parseInt(req.query.page) || 1);
        const size = Math.max(1, parseInt(req.query.size) || 10);
        const response = await getTransactionService(userId , page , size);
        if(!response.status) {
            res.status(400).json(response);
            return;
        }
        res.status(200).json(response);
    } catch (error) {
        next(error);
    }
}

module.exports = getTransactionController;