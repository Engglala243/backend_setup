const db = require("_helpers/db");
const common = require("_helpers/common");

module.exports = {
    create,
    getAll,
    getById,
    update,
    deleteBrand
};

async function create(params, auth) {
    const brandId = common.generateUUID();
    
    const brand = await db.Brand.create({
        id: brandId,
        name: params.name,
        description: params.description,
        logo: params.logo,
        created_by: auth.user_id,
        updated_by: auth.user_id
    });

    return brand;
}

async function getAll() {
    return await db.Brand.findAll({
        where: { is_active: 1 },
        order: [['created_at', 'DESC']]
    });
}

async function getById(id) {
    const brand = await db.Brand.findOne({
        where: { id, is_active: 1 }
    });
    
    if (!brand) throw "Brand not found";
    return brand;
}

async function update(id, params, auth) {
    const brand = await getById(id);
    
    await brand.update({
        ...params,
        updated_by: auth.user_id
    });

    return brand;
}

async function deleteBrand(id) {
    const brand = await getById(id);
    await brand.update({ is_active: 0 });
    return { message: "Brand deleted successfully" };
}