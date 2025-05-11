const transactionModel = require("../../model/transactionModel");

const getTransactionService = async (userId , page , size) => {
    try {
        const totalTransaction = await transactionModel.countDocuments({ user: userId });
        const totalPages = Math.ceil(totalTransaction/size);
        if(page > totalPages && totalPages !== 0) {
            return {
                status : true,
                data : {
                    transactions : [],
                    isNextAvailable : false 
                },
                error : null
            };
        }
        const transactions = await transactionModel.find({ user: userId })
            .sort({ date: -1 })
            .skip((page-1) * size)
            .limit(size)
            .select('-user')
            .populate({
                path : 'category',
                select: 'categoryName categoryEmoji isDeleted'
            });
        deleteCategory = " - (Deleted)"
        
        transactions.forEach(transaction => {
            if (transaction.category?.isDeleted) {
                transaction.category.categoryName += deleteCategory;
            }
        });
        return {
            status : true,
            data : {
                transactions,
                isNextAvailable : page < totalPages
            },
            error : null
        };
    } catch (error) {
        throw error;
    }
}

module.exports = getTransactionService;