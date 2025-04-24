const addCategoryController = require('../controller/categoryController/addCategoryController');
const categoryRoute = require('express').Router();

categoryRoute.post('/' , addCategoryController);

module.exports = categoryRoute;