const { default: mongoose } = require("mongoose")

const database = {};

const connectDB = () => {
    try {
        const spendEaseUrl = (process.env.MONGODB_URL ?? "mongodb://localhost:27017/") + (process.env.MAIN_DB ?? "spend-ease"); 
        const spendEase = mongoose.createConnection(spendEaseUrl);
        spendEase.on('open' , () => {
            console.log("Connected to the DB successfully");
        });
        spendEase.on('error' , (err) => {
            throw new Error(err)
        })
        database['spendEase'] = spendEase;
    } catch (error) {
        console.log(error.message);
        process.exit(1);
    }
};


module.exports = {
    connectDB,
    database
};