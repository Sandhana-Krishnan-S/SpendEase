const addTransactionController = require('../controller/transactionController/addTransactionController');
const getTransactionController = require('../controller/transactionController/getTransactionController');

const transactionRoute = require('express').Router();

transactionRoute.post('/' ,addTransactionController);
transactionRoute.get('/' , getTransactionController)

module.exports = transactionRoute;