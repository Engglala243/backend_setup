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
    const theme = await db.Theme.create({
        id: uuidv4(),
        ...params,
        created_by: userId
    });
    return theme;
}

async function getAll() {
    return await db.Theme.findAll({
        where: { is_deleted: 0 },
        order: [["created_at", "DESC"]]
    });
}

async function getById(id) {
    return await db.Theme.findOne({
        where: { id, is_deleted: 0 }
    });
}

async function update(id, params, userId) {
    const theme = await getById(id);
    if (!theme) throw "Theme not found";
    
    Object.assign(theme, params, { updated_by: userId });
    await theme.save();
    return theme;
}

async function _delete(id, userId) {
    const theme = await getById(id);
    if (!theme) throw "Theme not found";
    
    theme.is_deleted = 1;
    theme.updated_by = userId;
    await theme.save();
}