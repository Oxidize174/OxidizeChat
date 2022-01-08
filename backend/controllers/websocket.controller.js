const db = require("../models");

exports.createMessage = async (text, userFrom, userTo) => {
    const message = {
        text,
        userFrom,
        userTo,
    };
    try {
        return await db.message.create(message)
    } catch (e) {
        console.error(e)
    }
}
