const addTransactionController = require('../controller/transactionController/addTransactionController');

const transactionRoute = require('express').Router();

transactionRoute.post('/' ,addTransactionController);

module.exports = transactionRoute;