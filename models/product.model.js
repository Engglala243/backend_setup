const { DataTypes } = require("sequelize");

module.exports = model;

function model(sequelize) {
    const attributes = {
        id: {
            type: DataTypes.STRING(36),
            allowNull: false,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        price: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        },
        discount_price: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: true
        },
        discount_percentage: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0
        },
        sku: {
            type: DataTypes.STRING(100),
            allowNull: true,
            unique: true
        },
        stock_quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        images: {
            type: DataTypes.JSON,
            allowNull: true
        },
        category_id: {
            type: DataTypes.STRING(36),
            allowNull: false
        },
        brand_id: {
            type: DataTypes.STRING(36),
            allowNull: true
        },
        fabric_id: {
            type: DataTypes.STRING(36),
            allowNull: true
        },
        occasion_id: {
            type: DataTypes.STRING(36),
            allowNull: true
        },
        border_id: {
            type: DataTypes.STRING(36),
            allowNull: true
        },
        pattern_id: {
            type: DataTypes.STRING(36),
            allowNull: true
        },
        size_id: {
            type: DataTypes.STRING(36),
            allowNull: true
        },
        theme_id: {
            type: DataTypes.STRING(36),
            allowNull: true
        },
        type_id: {
            type: DataTypes.STRING(36),
            allowNull: true
        },
        wash_care_id: {
            type: DataTypes.STRING(36),
            allowNull: true
        },
        fashion_trend_id: {
            type: DataTypes.STRING(36),
            allowNull: true
        },
        colors: {
            type: DataTypes.JSON,
            allowNull: true
        },
        rating: {
            type: DataTypes.DECIMAL(2, 1),
            allowNull: true,
            defaultValue: 0.0
        },
        review_count: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        is_featured: {
            type: DataTypes.TINYINT,
            defaultValue: 0
        },
        is_trending: {
            type: DataTypes.TINYINT,
            defaultValue: 0
        },
        is_active: {
            type: DataTypes.TINYINT,
            defaultValue: 1
        },
        is_deleted: {
            type: DataTypes.TINYINT,
            defaultValue: 0
        },
        created_by: {
            type: DataTypes.STRING(36),
            allowNull: true
        },
        updated_by: {
            type: DataTypes.STRING(36),
            allowNull: true
        }
    };

    const options = {
        tableName: "products",
        underscored: true,
        timestamps: true,
        createdAt: "created_at",
        updatedAt: "updated_at",
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci"
    };

    return sequelize.define("Product", attributes, options);
}