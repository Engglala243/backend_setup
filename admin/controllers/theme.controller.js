const themeService = require("../services/theme.service");

module.exports = {
    create,
    getAll,
    getById,
    update,
    delete: _delete
};

async function create(req, res, next) {
    try {
        const theme = await themeService.create(req.body, req.auth_params.user_id);
        res.json({ success: true, data: theme, message: "Theme created successfully" });
    } catch (err) {
        next(err);
    }
}

async function getAll(req, res, next) {
    try {
        const themes = await themeService.getAll();
        res.json({ success: true, data: themes });
    } catch (err) {
        next(err);
    }
}

async function getById(req, res, next) {
    try {
        const theme = await themeService.getById(req.params.id);
        if (!theme) return res.status(404).json({ success: false, message: "Theme not found" });
        res.json({ success: true, data: theme });
    } catch (err) {
        next(err);
    }
}

async function update(req, res, next) {
    try {
        const theme = await themeService.update(req.params.id, req.body, req.auth_params.user_id);
        res.json({ success: true, data: theme, message: "Theme updated successfully" });
    } catch (err) {
        next(err);
    }
}

async function _delete(req, res, next) {
    try {
        await themeService.delete(req.params.id, req.auth_params.user_id);
        res.json({ success: true, message: "Theme deleted successfully" });
    } catch (err) {
        next(err);
    }
}