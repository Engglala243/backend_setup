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
        tableName: "occasions",
        underscored: true,
        timestamps: true,
        createdAt: "created_at",
        updatedAt: "updated_at",
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci"
    };

    return sequelize.define("Occasion", attributes, options);
}