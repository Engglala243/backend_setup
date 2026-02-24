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
    const type = await db.Type.create({
        id: uuidv4(),
        ...params,
        created_by: userId
    });
    return type;
}

async function getAll() {
    return await db.Type.findAll({
        where: { is_deleted: 0 },
        order: [["created_at", "DESC"]]
    });
}

async function getById(id) {
    return await db.Type.findOne({
        where: { id, is_deleted: 0 }
    });
}

async function update(id, params, userId) {
    const type = await getById(id);
    if (!type) throw "Type not found";
    
    Object.assign(type, params, { updated_by: userId });
    await type.save();
    return type;
}

async function _delete(id, userId) {
    const type = await getById(id);
    if (!type) throw "Type not found";
    
    type.is_deleted = 1;
    type.updated_by = userId;
    await type.save();
}