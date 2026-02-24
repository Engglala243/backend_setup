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
    const pattern = await db.Pattern.create({
        id: uuidv4(),
        ...params,
        created_by: userId
    });
    return pattern;
}

async function getAll() {
    return await db.Pattern.findAll({
        where: { is_deleted: 0 },
        order: [["created_at", "DESC"]]
    });
}

async function getById(id) {
    return await db.Pattern.findOne({
        where: { id, is_deleted: 0 }
    });
}

async function update(id, params, userId) {
    const pattern = await getById(id);
    if (!pattern) throw "Pattern not found";
    
    Object.assign(pattern, params, { updated_by: userId });
    await pattern.save();
    return pattern;
}

async function _delete(id, userId) {
    const pattern = await getById(id);
    if (!pattern) throw "Pattern not found";
    
    pattern.is_deleted = 1;
    pattern.updated_by = userId;
    await pattern.save();
}