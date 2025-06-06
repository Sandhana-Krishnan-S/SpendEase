const transactionModel = require("../../model/transactionModel");

const deleteTransactionService = async ( transactionId )  => {
    try {
        const deletedTransaction = await transactionModel.findByIdAndDelete(transactionId);
        if(!deletedTransaction) {
            return  {
                status : false,
                data : null,
                error : "Transaction not found."
            };
        }
        return {
            status : true,
            data : deletedTransaction,
            error : null
        };
    } catch (error) {
        throw error;
    }
}

module.exports = deleteTransactionService;