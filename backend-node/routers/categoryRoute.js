const addCategoryController = require('../controller/categoryController/addCategoryController');
const deleteCategoryController = require('../controller/categoryController/deleteCategoryController');
const getCategoryController = require('../controller/categoryController/getCategoryController');
const categoryRoute = require('express').Router();

categoryRoute.post('/' , addCategoryController);
categoryRoute.get('/' , getCategoryController);
//update
categoryRoute.delete('/' , deleteCategoryController);

module.exports = categoryRoute;