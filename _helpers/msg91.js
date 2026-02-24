const axios = require("axios");

async function sendMessage(templateId, mobile, name, otp) {
    try {
        const response = await axios.post(
            `https://control.msg91.com/api/v5/flow/`,
            {
                template_id: templateId,
                short_url: "0",
                recipients: [
                    {
                        mobiles: mobile,
                        name: name,
                        otp: otp
                    }
                ]
            },
            {
                headers: {
                    authkey: process.env.MSG91_AUTH_KEY,
                    "content-type": "application/json"
                }
            }
        );
        return response.data;
    } catch (error) {
        console.error("MSG91 Error:", error.response?.data || error.message);
        return false;
    }
}

module.exports = { sendMessage };
