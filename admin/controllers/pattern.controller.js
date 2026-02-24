const patternService = require("../services/pattern.service");

module.exports = {
    create,
    getAll,
    getById,
    update,
    delete: _delete
};

async function create(req, res, next) {
    try {
        const pattern = await patternService.create(req.body, req.auth_params.user_id);
        res.json({ success: true, data: pattern, message: "Pattern created successfully" });
    } catch (err) {
        next(err);
    }
}

async function getAll(req, res, next) {
    try {
        const patterns = await patternService.getAll();
        res.json({ success: true, data: patterns });
    } catch (err) {
        next(err);
    }
}

async function getById(req, res, next) {
    try {
        const pattern = await patternService.getById(req.params.id);
        if (!pattern) return res.status(404).json({ success: false, message: "Pattern not found" });
        res.json({ success: true, data: pattern });
    } catch (err) {
        next(err);
    }
}

async function update(req, res, next) {
    try {
        const pattern = await patternService.update(req.params.id, req.body, req.auth_params.user_id);
        res.json({ success: true, data: pattern, message: "Pattern updated successfully" });
    } catch (err) {
        next(err);
    }
}

async function _delete(req, res, next) {
    try {
        await patternService.delete(req.params.id, req.auth_params.user_id);
        res.json({ success: true, message: "Pattern deleted successfully" });
    } catch (err) {
        next(err);
    }
}