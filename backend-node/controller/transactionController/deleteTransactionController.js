const deleteTransactionService = require("../../service/transactionService/deleteTransactionService");

const deleteTransactionController = async (req , res , next) => {
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
        const transactionId = req.query.transactionId;
        const response = await deleteTransactionService(transactionId);
        if(!response.status) {
            if(response.error.startsWith('Transaction not found.')) {
                res.status(404).json(response);
                return;
            }
            res.status(400).json(response);
            return;
        }
        res.status(200).json(response);
    } catch (error) {
        next(error);
    }
}

module.exports = deleteTransactionController;
