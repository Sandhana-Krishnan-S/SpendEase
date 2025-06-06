const addTransactionController = require('../controller/transactionController/addTransactionController');
const deleteTransactionController = require('../controller/transactionController/deleteTransactionController');
const getTransactionController = require('../controller/transactionController/getTransactionController');
const updateTransactionController = require('../controller/transactionController/updateTransactionController');

const transactionRoute = require('express').Router();

transactionRoute.post('/' ,addTransactionController);
transactionRoute.get('/' , getTransactionController);
transactionRoute.put('/' , updateTransactionController);
transactionRoute.delete('/' , deleteTransactionController);

module.exports = transactionRoute;