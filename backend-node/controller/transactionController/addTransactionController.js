const addTransactionService = require("../../service/transactionService/addTransactionService");

const addTransactionController = async (req , res , next) => {
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
        const transaction = req.body;
        const response = await addTransactionService(userId , transaction);
        if(!response.status) {
            res.status(400).json(response);
            return;
        }
        res.status(201).json(response);
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

module.exports = addTransactionController;