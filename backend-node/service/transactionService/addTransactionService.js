const { validateTransactionCategory } = require("../../helper/categoryValidation");
const transactionModel = require("../../model/transactionModel");

const addTransactionService = async (userId , transaction) => {
    try {
        const categoryCheck = await validateTransactionCategory(transaction.category , userId);
        if(!categoryCheck.status) {
            return categoryCheck;
        }
        transaction.user = userId;
        const newTransaction = new transactionModel( transaction );
        const savedTransaction = await newTransaction.save();
        return {
            status : true,
            data : savedTransaction,
            error : false
        };
    } catch (error) {
        throw error;
    }
}



module.exports = addTransactionService;