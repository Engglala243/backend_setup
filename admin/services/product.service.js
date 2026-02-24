const db = require("../../_helpers/db");
const { v4: uuidv4 } = require("uuid");
const { Op } = require("sequelize");

module.exports = {
    create,
    getAll,
    getAllWithFilters,
    getById,
    update,
    delete: _delete
};

async function create(params, userId) {
    const product = await db.Product.create({
        id: uuidv4(),
        ...params,
        created_by: userId
    });
    return product;
}

async function getAll() {
    return await db.Product.findAll({
        where: { is_deleted: 0 },
        order: [["created_at", "DESC"]]
    });
}

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
        where: { id, is_deleted: 0 }
    });
}

async function update(id, params, userId) {
    const product = await getById(id);
    if (!product) throw "Product not found";
    
    Object.assign(product, params, { updated_by: userId });
    await product.save();
    return product;
}

async function _delete(id, userId) {
    const product = await getById(id);
    if (!product) throw "Product not found";
    
    product.is_deleted = 1;
    product.updated_by = userId;
    await product.save();
}