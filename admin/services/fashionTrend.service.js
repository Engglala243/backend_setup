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
    const fashionTrend = await db.FashionTrend.create({
        id: uuidv4(),
        ...params,
        created_by: userId
    });
    return fashionTrend;
}

async function getAll() {
    return await db.FashionTrend.findAll({
        where: { is_deleted: 0 },
        order: [["created_at", "DESC"]]
    });
}

async function getById(id) {
    return await db.FashionTrend.findOne({
        where: { id, is_deleted: 0 }
    });
}

async function update(id, params, userId) {
    const fashionTrend = await getById(id);
    if (!fashionTrend) throw "Fashion trend not found";
    
    Object.assign(fashionTrend, params, { updated_by: userId });
    await fashionTrend.save();
    return fashionTrend;
}

async function _delete(id, userId) {
    const fashionTrend = await getById(id);
    if (!fashionTrend) throw "Fashion trend not found";
    
    fashionTrend.is_deleted = 1;
    fashionTrend.updated_by = userId;
    await fashionTrend.save();
}