const db = require("_helpers/db");
const common = require("_helpers/common");

module.exports = {
    create,
    getAll,
    getById,
    update,
    deleteFabric
};

async function create(params, auth) {
    const fabricId = common.generateUUID();
    
    const fabric = await db.Fabric.create({
        id: fabricId,
        name: params.name,
        description: params.description,
        created_by: auth.user_id,
        updated_by: auth.user_id
    });

    return fabric;
}

async function getAll() {
    return await db.Fabric.findAll({
        where: { is_active: 1 },
        order: [['name', 'ASC']]
    });
}

async function getById(id) {
    const fabric = await db.Fabric.findOne({
        where: { id, is_active: 1 }
    });
    
    if (!fabric) throw "Fabric not found";
    return fabric;
}

async function update(id, params, auth) {
    const fabric = await getById(id);
    
    await fabric.update({
        ...params,
        updated_by: auth.user_id
    });

    return fabric;
}

async function deleteFabric(id) {
    const fabric = await getById(id);
    await fabric.update({ is_active: 0 });
    return { message: "Fabric deleted successfully" };
}