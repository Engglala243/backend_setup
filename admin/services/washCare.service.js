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
    const washCare = await db.WashCare.create({
        id: uuidv4(),
        ...params,
        created_by: userId
    });
    return washCare;
}

async function getAll() {
    return await db.WashCare.findAll({
        where: { is_deleted: 0 },
        order: [["created_at", "DESC"]]
    });
}

async function getById(id) {
    return await db.WashCare.findOne({
        where: { id, is_deleted: 0 }
    });
}

async function update(id, params, userId) {
    const washCare = await getById(id);
    if (!washCare) throw "Wash care not found";
    
    Object.assign(washCare, params, { updated_by: userId });
    await washCare.save();
    return washCare;
}

async function _delete(id, userId) {
    const washCare = await getById(id);
    if (!washCare) throw "Wash care not found";
    
    washCare.is_deleted = 1;
    washCare.updated_by = userId;
    await washCare.save();
}