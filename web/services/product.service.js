const db = require("../../_helpers/db");
const { Op } = require("sequelize");

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

async function getAllWithFilters(filters) {
    const { category, priceMin, priceMax, color, fabric, occasion, discount, rating, sort, page = 1, limit = 20 } = filters;
    
    let whereClause = { is_deleted: 0, is_active: 1 };
    let orderClause = [["created_at", "DESC"]];

    // Category filter
    if (category) {
        whereClause.category_id = category;
    }

    // Price range filter
    if (priceMin || priceMax) {
        whereClause.price = {};
        if (priceMin) whereClause.price[Op.gte] = priceMin;
        if (priceMax) whereClause.price[Op.lte] = priceMax;
    }

    // Color filter (JSON array)
    if (color && color.length > 0) {
        whereClause.colors = {
            [Op.overlap]: color
        };
    }

    // Fabric filter
    if (fabric && fabric.length > 0) {
        whereClause.fabric_id = {
            [Op.in]: fabric
        };
    }

    // Occasion filter
    if (occasion && occasion.length > 0) {
        whereClause.occasion_id = {
            [Op.in]: occasion
        };
    }

    // Discount filter
    if (discount) {
        whereClause.discount_percentage = {
            [Op.gte]: discount
        };
    }

    // Rating filter
    if (rating) {
        whereClause.rating = {
            [Op.gte]: rating
        };
    }

    // Sorting
    if (sort) {
        switch (sort) {
            case "price_low_to_high":
                orderClause = [["price", "ASC"]];
                break;
            case "price_high_to_low":
                orderClause = [["price", "DESC"]];
                break;
            case "better_discount":
                orderClause = [["discount_percentage", "DESC"]];
                break;
            case "custom_rating":
                orderClause = [["rating", "DESC"]];
                break;
            case "popularity":
                orderClause = [["review_count", "DESC"]];
                break;
            case "whats_new":
                orderClause = [["created_at", "DESC"]];
                break;
            default:
                orderClause = [["created_at", "DESC"]];
        }
    }

    const offset = (page - 1) * limit;

    const { count, rows } = await db.Product.findAndCountAll({
        where: whereClause,
        order: orderClause,
        limit: parseInt(limit),
        offset: parseInt(offset)
    });

    return {
        products: rows,
        totalCount: count,
        currentPage: parseInt(page),
        totalPages: Math.ceil(count / limit),
        hasNextPage: page < Math.ceil(count / limit),
        hasPrevPage: page > 1
    };
}

async function getById(id) {
    return await db.Product.findOne({
        where: { id, is_deleted: 0, is_active: 1 }
    });
}

async function getFeatured(limit = 10) {
    return await db.Product.findAll({
        where: { is_deleted: 0, is_active: 1, is_featured: 1 },
        order: [["created_at", "DESC"]],
        limit: parseInt(limit)
    });
}

async function getTrending(limit = 10) {
    return await db.Product.findAll({
        where: { is_deleted: 0, is_active: 1, is_trending: 1 },
        order: [["review_count", "DESC"]],
        limit: parseInt(limit)
    });
}

async function getByCategory(categoryId, limit = 20) {
    return await db.Product.findAll({
        where: { is_deleted: 0, is_active: 1, category_id: categoryId },
        order: [["created_at", "DESC"]],
        limit: parseInt(limit)
    });
}

async function getByBrand(brandId, limit = 20) {
    return await db.Product.findAll({
        where: { is_deleted: 0, is_active: 1, brand_id: brandId },
        order: [["created_at", "DESC"]],
        limit: parseInt(limit)
    });
}

async function searchProducts(query, limit = 20) {
    return await db.Product.findAll({
        where: {
            is_deleted: 0,
            is_active: 1,
            [Op.or]: [
                { name: { [Op.like]: `%${query}%` } },
                { description: { [Op.like]: `%${query}%` } }
            ]
        },
        order: [["created_at", "DESC"]],
        limit: parseInt(limit)
    });
}

async function getRelated(productId, categoryId, limit = 8) {
    return await db.Product.findAll({
        where: {
            is_deleted: 0,
            is_active: 1,
            category_id: categoryId,
            id: { [Op.ne]: productId }
        },
        order: [["created_at", "DESC"]],
        limit: parseInt(limit)
    });
}