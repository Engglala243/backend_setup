const jwt = require("jsonwebtoken");
const db = require("_helpers/db");
const common = require("_helpers/common");
const { sendMessage } = require("_helpers/msg91");

module.exports = {
    sendSignUpOTP,
    signUp,
    sendLoginOTP,
    login,
    getProfile,
    updateProfile
};

async function sendSignUpOTP(params) {
    const { name, email, phone } = params;

    const existingUser = await db.User.findOne({
        where: { email, is_deleted: 0 }
    });

    if (existingUser) throw "User already exists with this email";

    const otpCode = Math.floor(1000 + Math.random() * 9000);

    if (phone) {
        const mobileNo = phone.startsWith("91") ? phone : `91${phone}`;
        await sendMessage(process.env.MSG91_TEMPLATE_ID, mobileNo, name, otpCode);
    }

    const userId = common.generateUUID();
    await db.User.create({
        id: userId,
        name,
        email,
        phone,
        role: "web_user",
        otp: otpCode,
        base_url: process.env.IMAGE_BASE_URL,
        profile_image: "/profiles/default.png",
        created_by: userId,
        updated_by: userId
    });

    return { email };
}

async function signUp(params) {
    const { email, otp } = params;

    const user = await db.User.findOne({
        where: { email, otp, is_deleted: 0 }
    });

    if (!user) throw "Invalid OTP";

    await user.update({ otp: 0 });

    return { message: "User registered successfully" };
}

async function sendLoginOTP(params) {
    const { email } = params;

    const user = await db.User.findOne({
        where: { email, role: "web_user", is_deleted: 0 }
    });

    if (!user) throw "User not found";

    const otpCode = Math.floor(1000 + Math.random() * 9000);

    if (user.phone) {
        const mobileNo = user.phone.startsWith("91") ? user.phone : `91${user.phone}`;
        await sendMessage(process.env.MSG91_TEMPLATE_ID, mobileNo, user.name, otpCode);
    }

    await user.update({ otp: otpCode });

    return { email };
}

async function login(params) {
    const { email, otp } = params;

    const user = await db.User.findOne({
        where: { email, otp, role: "web_user", is_deleted: 0 },
        attributes: ["id", "name", "email", "phone", "profile_image", "base_url"]
    });

    if (!user) throw "Invalid credentials";

    const token = jwt.sign(
        { userId: user.id, role: "web_user" },
        process.env.JWT_SECRET_KEY,
        { expiresIn: "12h" }
    );

    await user.update({ access_token: token, otp: 0 });

    return {
        access_token: token,
        expire_token: "12 hours",
        user: user.get()
    };
}

async function getProfile(auth) {
    const user = await db.User.findOne({
        where: { id: auth.user_id, role: "web_user", is_deleted: 0 }
    });

    if (!user) throw "User not found";
    return user;
}

async function updateProfile(params, auth) {
    const user = await db.User.findOne({
        where: { id: auth.user_id, role: "web_user", is_deleted: 0 }
    });

    if (!user) throw "User not found";

    const updateData = { 
        ...params,
        updated_by: auth.user_id
    };

    if (params.profile_image) {
        updateData.base_url = process.env.IMAGE_BASE_URL;
        updateData.profile_image = `/profiles/${params.profile_image}`;
    }

    await user.update(updateData);
    return user;
}
