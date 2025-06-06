const addCategoryService = require("../service/categoryService/addCategoryService");

const essentialsHelper = async (userId) => {
    const defaultCategory = [
        {
            name: "Food",
            emoji: "🍔"
        },
        {
            name: "Transport",
            emoji: "🚗"
        },
        {
            name: "Bills",
            emoji: "💡"
        },
        {
            name: "Shopping",
            emoji: "🛍️"
        },
        {
            name: "Health",
            emoji: "💊"
        }
    ];

    for (const { name, emoji } of defaultCategory) {
        try {
            await addCategoryService(userId, name, emoji);
        } catch (error) {
            throw error;
        }
    }
};

module.exports = essentialsHelper;
