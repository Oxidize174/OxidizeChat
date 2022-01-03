module.exports = (sequelize, Sequelize) => {
    const Message = sequelize.define("message", {
        text: {
            type: Sequelize.TEXT
        },
    });

    return Message;
};