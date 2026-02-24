const borderService = require("../services/border.service");

module.exports = {
    create,
    getAll,
    getById,
    update,
    delete: _delete
};

async function create(req, res, next) {
    try {
        const border = await borderService.create(req.body, req.auth_params.user_id);
        res.json({ success: true, data: border, message: "Border created successfully" });
    } catch (err) {
        next(err);
    }
}

async function getAll(req, res, next) {
    try {
        const borders = await borderService.getAll();
        res.json({ success: true, data: borders });
    } catch (err) {
        next(err);
    }
}

async function getById(req, res, next) {
    try {
        const border = await borderService.getById(req.params.id);
        if (!border) return res.status(404).json({ success: false, message: "Border not found" });
        res.json({ success: true, data: border });
    } catch (err) {
        next(err);
    }
}

async function update(req, res, next) {
    try {
        const border = await borderService.update(req.params.id, req.body, req.auth_params.user_id);
        res.json({ success: true, data: border, message: "Border updated successfully" });
    } catch (err) {
        next(err);
    }
}

async function _delete(req, res, next) {
    try {
        await borderService.delete(req.params.id, req.auth_params.user_id);
        res.json({ success: true, message: "Border deleted successfully" });
    } catch (err) {
        next(err);
    }
}