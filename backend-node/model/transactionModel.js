const { default: mongoose } = require("mongoose");

const transactionSchema = mongoose.Schema({
    amount : {
        required : true,
        type : Number,
        min : 0.001
    },
    note : {
        required : true,
        type : String,
        minlength: 3,
        maxlength: 25
    },
    description : {
        required : false,
        type : String,
        minlength : 3,
        maxlength : 200
    },
    date : {
        required : true,
        type : Date,
        default : Date.now
    },
    transactionType : {
        required : true,
        type : String
    },
    category : {
        required : true,
        type : mongoose.Types.ObjectId,
        ref : 'category'
    },
    user : {
        required : true,
        type : mongoose.Types.ObjectId,
        ref : 'users'
    }
});

const transactionModel = mongoose.model('transaction' , transactionSchema);

module.exports = transactionModel;