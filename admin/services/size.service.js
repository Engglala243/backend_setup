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
    const size = await db.Size.create({
        id: uuidv4(),
        ...params,
        created_by: userId
    });
    return size;
}

async function getAll() {
    return await db.Size.findAll({
        where: { is_deleted: 0 },
        order: [["created_at", "DESC"]]
    });
}

async function getById(id) {
    return await db.Size.findOne({
        where: { id, is_deleted: 0 }
    });
}

async function update(id, params, userId) {
    const size = await getById(id);
    if (!size) throw "Size not found";
    
    Object.assign(size, params, { updated_by: userId });
    await size.save();
    return size;
}

async function _delete(id, userId) {
    const size = await getById(id);
    if (!size) throw "Size not found";
    
    size.is_deleted = 1;
    size.updated_by = userId;
    await size.save();
}