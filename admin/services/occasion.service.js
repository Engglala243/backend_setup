const db = require("_helpers/db");
const common = require("_helpers/common");

module.exports = {
    create,
    getAll,
    getById,
    update,
    deleteOccasion
};

async function create(params, auth) {
    const occasionId = common.generateUUID();
    
    const occasion = await db.Occasion.create({
        id: occasionId,
        name: params.name,
        description: params.description,
        created_by: auth.user_id,
        updated_by: auth.user_id
    });

    return occasion;
}

async function getAll() {
    return await db.Occasion.findAll({
        where: { is_active: 1 },
        order: [['name', 'ASC']]
    });
}

async function getById(id) {
    const occasion = await db.Occasion.findOne({
        where: { id, is_active: 1 }
    });
    
    if (!occasion) throw "Occasion not found";
    return occasion;
}

async function update(id, params, auth) {
    const occasion = await getById(id);
    
    await occasion.update({
        ...params,
        updated_by: auth.user_id
    });

    return occasion;
}

async function deleteOccasion(id) {
    const occasion = await getById(id);
    await occasion.update({ is_active: 0 });
    return { message: "Occasion deleted successfully" };
}