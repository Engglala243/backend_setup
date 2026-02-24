const productService = require("../services/product.service");

module.exports = {
    create,
    getAll,
    getAllWithFilters,
    getById,
    update,
    delete: _delete
};

async function create(req, res, next) {
    try {
        const productData = { ...req.body };
        
        // Handle file uploads (images)
        if (req.files && req.files.length > 0) {
            productData.images = req.files.map(file => file.path);
        }

        // Parse colors if it's a string
        if (req.body.colors && typeof req.body.colors === 'string') {
            try {
                productData.colors = JSON.parse(req.body.colors);
            } catch (e) {
                productData.colors = req.body.colors.split(',');
            }
        }

        const product = await productService.create(productData, req.auth_params.user_id);
        res.json({ success: true, data: product, message: "Product created successfully" });
    } catch (err) {
        next(err);
    }
}

async function getAll(req, res, next) {
    try {
        const products = await productService.getAll();
        res.json({ success: true, data: products });
    } catch (err) {
        next(err);
    }
}

async function getAllWithFilters(req, res, next) {
    try {
        const result = await productService.getAllWithFilters(req.body);
        res.json({ success: true, data: result });
    } catch (err) {
        next(err);
    }
}

async function getById(req, res, next) {
    try {
        const product = await productService.getById(req.params.id);
        if (!product) return res.status(404).json({ success: false, message: "Product not found" });
        res.json({ success: true, data: product });
    } catch (err) {
        next(err);
    }
}

async function update(req, res, next) {
    try {
        const productData = { ...req.body };
        
        // Handle file uploads (images)
        if (req.files && req.files.length > 0) {
            productData.images = req.files.map(file => file.path);
        }

        // Parse colors if it's a string
        if (req.body.colors && typeof req.body.colors === 'string') {
            try {
                productData.colors = JSON.parse(req.body.colors);
            } catch (e) {
                productData.colors = req.body.colors.split(',');
            }
        }

        const product = await productService.update(req.params.id, productData, req.auth_params.user_id);
        res.json({ success: true, data: product, message: "Product updated successfully" });
    } catch (err) {
        next(err);
    }
}

async function _delete(req, res, next) {
    try {
        await productService.delete(req.params.id, req.auth_params.user_id);
        res.json({ success: true, message: "Product deleted successfully" });
    } catch (err) {
        next(err);
    }
}