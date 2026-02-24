const productService = require("../services/product.service");

module.exports = {
    getAllWithFilters,
    getById,
    getFeatured,
    getTrending,
    getByCategory,
    getByBrand,
    searchProducts,
    getRelated
};

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

async function getFeatured(req, res, next) {
    try {
        const { limit = 10 } = req.query;
        const products = await productService.getFeatured(limit);
        res.json({ success: true, data: products });
    } catch (err) {
        next(err);
    }
}

async function getTrending(req, res, next) {
    try {
        const { limit = 10 } = req.query;
        const products = await productService.getTrending(limit);
        res.json({ success: true, data: products });
    } catch (err) {
        next(err);
    }
}

async function getByCategory(req, res, next) {
    try {
        const { limit = 20 } = req.query;
        const products = await productService.getByCategory(req.params.categoryId, limit);
        res.json({ success: true, data: products });
    } catch (err) {
        next(err);
    }
}

async function getByBrand(req, res, next) {
    try {
        const { limit = 20 } = req.query;
        const products = await productService.getByBrand(req.params.brandId, limit);
        res.json({ success: true, data: products });
    } catch (err) {
        next(err);
    }
}

async function searchProducts(req, res, next) {
    try {
        const { q, limit = 20 } = req.query;
        if (!q) return res.status(400).json({ success: false, message: "Search query is required" });
        
        const products = await productService.searchProducts(q, limit);
        res.json({ success: true, data: products });
    } catch (err) {
        next(err);
    }
}

async function getRelated(req, res, next) {
    try {
        const { limit = 8 } = req.query;
        const product = await productService.getById(req.params.productId);
        if (!product) return res.status(404).json({ success: false, message: "Product not found" });
        
        const products = await productService.getRelated(req.params.productId, product.category_id, limit);
        res.json({ success: true, data: products });
    } catch (err) {
        next(err);
    }
}