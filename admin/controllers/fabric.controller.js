const responseHandler = require("_middleware/response-handler");
const service = require("../services/fabric.service");

module.exports = {
    create,
    getAll,
    getById,
    update,
    deleteFabric
};

async function create(req, res, next) {
    service
        .create(req.body, req.auth_params)
        .then((result) => responseHandler(req, res, "Fabric created successfully", true, result))
        .catch((error) => responseHandler(req, res, error));
}

async function getAll(req, res, next) {
    service
        .getAll()
        .then((result) => responseHandler(req, res, "Fabrics retrieved successfully", true, result))
        .catch((error) => responseHandler(req, res, error));
}

async function getById(req, res, next) {
    service
        .getById(req.params.id)
        .then((result) => responseHandler(req, res, "Fabric retrieved successfully", true, result))
        .catch((error) => responseHandler(req, res, error));
}

async function update(req, res, next) {
    service
        .update(req.params.id, req.body, req.auth_params)
        .then((result) => responseHandler(req, res, "Fabric updated successfully", true, result))
        .catch((error) => responseHandler(req, res, error));
}

async function deleteFabric(req, res, next) {
    service
        .deleteFabric(req.params.id)
        .then((result) => responseHandler(req, res, "Fabric deleted successfully", true, result))
        .catch((error) => responseHandler(req, res, error));
}