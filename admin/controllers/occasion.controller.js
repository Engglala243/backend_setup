const responseHandler = require("_middleware/response-handler");
const service = require("../services/occasion.service");

module.exports = {
    create,
    getAll,
    getById,
    update,
    deleteOccasion
};

async function create(req, res, next) {
    service
        .create(req.body, req.auth_params)
        .then((result) => responseHandler(req, res, "Occasion created successfully", true, result))
        .catch((error) => responseHandler(req, res, error));
}

async function getAll(req, res, next) {
    service
        .getAll()
        .then((result) => responseHandler(req, res, "Occasions retrieved successfully", true, result))
        .catch((error) => responseHandler(req, res, error));
}

async function getById(req, res, next) {
    service
        .getById(req.params.id)
        .then((result) => responseHandler(req, res, "Occasion retrieved successfully", true, result))
        .catch((error) => responseHandler(req, res, error));
}

async function update(req, res, next) {
    service
        .update(req.params.id, req.body, req.auth_params)
        .then((result) => responseHandler(req, res, "Occasion updated successfully", true, result))
        .catch((error) => responseHandler(req, res, error));
}

async function deleteOccasion(req, res, next) {
    service
        .deleteOccasion(req.params.id)
        .then((result) => responseHandler(req, res, "Occasion deleted successfully", true, result))
        .catch((error) => responseHandler(req, res, error));
}