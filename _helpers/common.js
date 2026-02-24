const moment = require("moment");
const { v4: uuidv4 } = require("uuid");

module.exports = {
    generateUUID: function () {
        return uuidv4();
    },
    curDateTime: function (isTime = true) {
        let strFormat = isTime ? "YYYY-MM-DD HH:mm:ss" : "YYYY-MM-DD";
        return moment().tz(process.env.TZ).format(strFormat);
    },
    withoutProperty: function (obj, property) {
        const { [property]: unused, ...rest } = obj;
        return rest;
    }
};
