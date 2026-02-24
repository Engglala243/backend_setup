const typeService = require("../services/type.service");

module.exports = {
    create,
    getAll,
    getById,
    update,
    delete: _delete
};

async function create(req, res, next) {
    try {
        const type = await typeService.create(req.body, req.auth_params.user_id);
        res.json({ success: true, data: type, message: "Type created successfully" });
    } catch (err) {
        next(err);
    }
}

async function getAll(req, res, next) {
    try {
        const types = await typeService.getAll();
        res.json({ success: true, data: types });
    } catch (err) {
        next(err);
    }
}

async function getById(req, res, next) {
    try {
        const type = await typeService.getById(req.params.id);
        if (!type) return res.status(404).json({ success: false, message: "Type not found" });
        res.json({ success: true, data: type });
    } catch (err) {
        next(err);
    }
}

async function update(req, res, next) {
    try {
        const type = await typeService.update(req.params.id, req.body, req.auth_params.user_id);
        res.json({ success: true, data: type, message: "Type updated successfully" });
    } catch (err) {
        next(err);
    }
}

async function _delete(req, res, next) {
    try {
        await typeService.delete(req.params.id, req.auth_params.user_id);
        res.json({ success: true, message: "Type deleted successfully" });
    } catch (err) {
        next(err);
    }
}