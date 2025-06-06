const updateTransactionService = require("../../service/transactionService/updateTransactionService");

const updateTransactionController = async (req , res , next) => {
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
        const transactionId = req.query.transactionId;
        const { amount , note , description ,  date , transactionType , category } = req.body;
        const response =  await updateTransactionService(transactionId , amount , note , description , date , transactionType , category , userId);
        if(!response.status) {
            if(response.error.startsWith('No such transaction found.')) {
                res.status(404).json(response);
            } else {
                res.status(400).json(response);
            }
            return;
        }
        res.status(200).json(response);
    } catch (error) {
        if(error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map((val) => {
                return val.message.replace('Path `', '').replace('`', '');
            });
            res.status(400).json({
                status : false,
                data : null,
                error : messages[0]
            })
        }
        next(error);
    }
}

module.exports = updateTransactionController;