const addCategoryController = require('../controller/categoryController/addCategoryController');
const getCategoryController = require('../controller/categoryController/getCategoryController');
const categoryRoute = require('express').Router();

categoryRoute.post('/' , addCategoryController);
categoryRoute.get('/' , getCategoryController);

module.exports = categoryRoute;