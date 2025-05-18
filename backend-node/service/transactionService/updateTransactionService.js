const { validateTransactionCategory } = require("../../helper/categoryValidation");
const transactionModel = require("../../model/transactionModel");

const updateTransactionService = async (transactionId , amount , note , description ,  date , transactionType , category , user) => {
    try {
        const categoryCheck = await validateTransactionCategory(category , user);
        if(!categoryCheck.status) {
            return categoryCheck;
        }
        const transaction = await transactionModel.getById(transactionId);
        if(!transaction) {
            return {
                status : false,
                data : null,
                error : 'No such transaction found.'
            };
        }
        transaction.amount = amount;
        transaction.note = note;
        transaction.description = description;
        transaction.data = date;
        transaction.transactionType = transactionType;
        transaction.category = category;
        transaction.user = user;
        const updatedTransaction = await transaction.save();
        return {
            status : true,
            data : updatedTransaction,
            error : null
        };
    } catch (error) {
        throw error;
    }
}

module.exports = updateTransactionService;