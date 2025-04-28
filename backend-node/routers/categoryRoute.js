const addCategoryController = require('../controller/categoryController/addCategoryController');
const deleteCategoryController = require('../controller/categoryController/deleteCategoryController');
const getCategoryController = require('../controller/categoryController/getCategoryController');
const updateCategoryController = require('../controller/categoryController/updateCategoryController');
const categoryRoute = require('express').Router();

categoryRoute.post('/' , addCategoryController);
categoryRoute.get('/' , getCategoryController);
categoryRoute.put('/' , updateCategoryController);
categoryRoute.delete('/' , deleteCategoryController);

module.exports = categoryRoute;