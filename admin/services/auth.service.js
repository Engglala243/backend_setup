const jwt = require("jsonwebtoken");
const db = require("_helpers/db");

const ADMIN_EMAIL = "admin@server.com";
const ADMIN_OTP = "8055";

module.exports = {
    login,
    getProfile
};

async function login(params) {
    const { email, otp } = params;

    if (email !== ADMIN_EMAIL || otp !== ADMIN_OTP) {
        throw "Invalid credentials";
    }

    let admin = await db.User.findOne({
        where: { email: ADMIN_EMAIL, role: "admin" }
    });

    if (!admin) {
        const adminId = require("_helpers/common").generateUUID();
        admin = await db.User.create({
            id: adminId,
            email: ADMIN_EMAIL,
            name: "Admin",
            role: "admin",
            is_active: 1,
            created_by: adminId,
            updated_by: adminId
        });
    }

    const token = jwt.sign(
        { userId: admin.id, role: "admin" },
        process.env.JWT_SECRET_KEY,
        { expiresIn: "12h" }
    );

    await admin.update({ access_token: token });

    return {
        access_token: token,
        expire_token: "12 hours",
        admin: { id: admin.id, email: admin.email }
    };
}

async function getProfile(auth) {
    const admin = await db.User.findOne({
        where: { id: auth.user_id, role: "admin", is_active: 1 },
        attributes: ["id", "name", "email", "role", "is_active", "created_at", "updated_at"]
    });

    if (!admin) throw "Admin not found";
    return admin;
}
