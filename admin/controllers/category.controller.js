const responseHandler = require("_middleware/response-handler");
const service = require("../services/category.service");

module.exports = {
    create,
    getAll,
    getById,
    update,
    deleteCategory
};

async function create(req, res, next) {
    service
        .create(req.body, req.auth_params)
        .then((result) => responseHandler(req, res, "Category created successfully", true, result))
        .catch((error) => responseHandler(req, res, error));
}

async function getAll(req, res, next) {
    service
        .getAll()
        .then((result) => responseHandler(req, res, "Categories retrieved successfully", true, result))
        .catch((error) => responseHandler(req, res, error));
}

async function getById(req, res, next) {
    service
        .getById(req.params.id)
        .then((result) => responseHandler(req, res, "Category retrieved successfully", true, result))
        .catch((error) => responseHandler(req, res, error));
}

async function update(req, res, next) {
    service
        .update(req.params.id, req.body, req.auth_params)
        .then((result) => responseHandler(req, res, "Category updated successfully", true, result))
        .catch((error) => responseHandler(req, res, error));
}

async function deleteCategory(req, res, next) {
    service
        .deleteCategory(req.params.id)
        .then((result) => responseHandler(req, res, "Category deleted successfully", true, result))
        .catch((error) => responseHandler(req, res, error));
}