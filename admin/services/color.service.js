const db = require("_helpers/db");
const common = require("_helpers/common");

module.exports = {
    create,
    getAll,
    getById,
    update,
    deleteColor
};

async function create(params, auth) {
    const colorId = common.generateUUID();
    
    const color = await db.Color.create({
        id: colorId,
        name: params.name,
        hex_code: params.hex_code,
        created_by: auth.user_id,
        updated_by: auth.user_id
    });

    return color;
}

async function getAll() {
    return await db.Color.findAll({
        where: { is_active: 1 },
        order: [['name', 'ASC']]
    });
}

async function getById(id) {
    const color = await db.Color.findOne({
        where: { id, is_active: 1 }
    });
    
    if (!color) throw "Color not found";
    return color;
}

async function update(id, params, auth) {
    const color = await getById(id);
    
    await color.update({
        ...params,
        updated_by: auth.user_id
    });

    return color;
}

async function deleteColor(id) {
    const color = await getById(id);
    await color.update({ is_active: 0 });
    return { message: "Color deleted successfully" };
}