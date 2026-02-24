const db = require("../../_helpers/db");
const { v4: uuidv4 } = require("uuid");

module.exports = {
    create,
    getAll,
    getById,
    update,
    delete: _delete
};

async function create(params, userId) {
    const border = await db.Border.create({
        id: uuidv4(),
        ...params,
        created_by: userId
    });
    return border;
}

async function getAll() {
    return await db.Border.findAll({
        where: { is_deleted: 0 },
        order: [["created_at", "DESC"]]
    });
}

async function getById(id) {
    return await db.Border.findOne({
        where: { id, is_deleted: 0 }
    });
}

async function update(id, params, userId) {
    const border = await getById(id);
    if (!border) throw "Border not found";
    
    Object.assign(border, params, { updated_by: userId });
    await border.save();
    return border;
}

async function _delete(id, userId) {
    const border = await getById(id);
    if (!border) throw "Border not found";
    
    border.is_deleted = 1;
    border.updated_by = userId;
    await border.save();
}