const fashionTrendService = require("../services/fashionTrend.service");

module.exports = {
    create,
    getAll,
    getById,
    update,
    delete: _delete
};

async function create(req, res, next) {
    try {
        const fashionTrend = await fashionTrendService.create(req.body, req.auth_params.user_id);
        res.json({ success: true, data: fashionTrend, message: "Fashion trend created successfully" });
    } catch (err) {
        next(err);
    }
}

async function getAll(req, res, next) {
    try {
        const fashionTrends = await fashionTrendService.getAll();
        res.json({ success: true, data: fashionTrends });
    } catch (err) {
        next(err);
    }
}

async function getById(req, res, next) {
    try {
        const fashionTrend = await fashionTrendService.getById(req.params.id);
        if (!fashionTrend) return res.status(404).json({ success: false, message: "Fashion trend not found" });
        res.json({ success: true, data: fashionTrend });
    } catch (err) {
        next(err);
    }
}

async function update(req, res, next) {
    try {
        const fashionTrend = await fashionTrendService.update(req.params.id, req.body, req.auth_params.user_id);
        res.json({ success: true, data: fashionTrend, message: "Fashion trend updated successfully" });
    } catch (err) {
        next(err);
    }
}

async function _delete(req, res, next) {
    try {
        await fashionTrendService.delete(req.params.id, req.auth_params.user_id);
        res.json({ success: true, message: "Fashion trend deleted successfully" });
    } catch (err) {
        next(err);
    }
}