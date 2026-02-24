const washCareService = require("../services/washCare.service");

module.exports = {
    create,
    getAll,
    getById,
    update,
    delete: _delete
};

async function create(req, res, next) {
    try {
        const washCare = await washCareService.create(req.body, req.auth_params.user_id);
        res.json({ success: true, data: washCare, message: "Wash care created successfully" });
    } catch (err) {
        next(err);
    }
}

async function getAll(req, res, next) {
    try {
        const washCares = await washCareService.getAll();
        res.json({ success: true, data: washCares });
    } catch (err) {
        next(err);
    }
}

async function getById(req, res, next) {
    try {
        const washCare = await washCareService.getById(req.params.id);
        if (!washCare) return res.status(404).json({ success: false, message: "Wash care not found" });
        res.json({ success: true, data: washCare });
    } catch (err) {
        next(err);
    }
}

async function update(req, res, next) {
    try {
        const washCare = await washCareService.update(req.params.id, req.body, req.auth_params.user_id);
        res.json({ success: true, data: washCare, message: "Wash care updated successfully" });
    } catch (err) {
        next(err);
    }
}

async function _delete(req, res, next) {
    try {
        await washCareService.delete(req.params.id, req.auth_params.user_id);
        res.json({ success: true, message: "Wash care deleted successfully" });
    } catch (err) {
        next(err);
    }
}