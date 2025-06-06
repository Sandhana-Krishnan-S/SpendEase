const { default: mongoose } = require("mongoose")

const connectDB = () => {
    try {
        const spendEaseUrl = (process.env.MONGODB_URL ?? "mongodb://localhost:27017/") + (process.env.MAIN_DB ?? "spend-ease");
        mongoose.connect(spendEaseUrl).then(() => {
            console.log("Connected to MongoDB");
          })
          .catch((error) => {
            console.error("Error connecting to MongoDB:", error);
            throw error;
          });
    } catch (error) {
        console.log(error.message);
        process.exit(1);
    }
};


module.exports = {
    connectDB,
};