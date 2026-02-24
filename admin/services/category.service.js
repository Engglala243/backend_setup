const db = require("_helpers/db");
const common = require("_helpers/common");

module.exports = {
    create,
    getAll,
    getById,
    update,
    deleteCategory
};

async function create(params, auth) {
    const categoryId = common.generateUUID();
    
    const category = await db.Category.create({
        id: categoryId,
        name: params.name,
        description: params.description,
        image: params.image,
        created_by: auth.user_id,
        updated_by: auth.user_id
    });

    return category;
}

async function getAll() {
    return await db.Category.findAll({
        where: { is_active: 1 },
        order: [['created_at', 'DESC']]
    });
}

async function getById(id) {
    const category = await db.Category.findOne({
        where: { id, is_active: 1 }
    });
    
    if (!category) throw "Category not found";
    return category;
}

async function update(id, params, auth) {
    const category = await getById(id);
    
    await category.update({
        ...params,
        updated_by: auth.user_id
    });

    return category;
}

async function deleteCategory(id) {
    const category = await getById(id);
    await category.update({ is_active: 0 });
    return { message: "Category deleted successfully" };
}