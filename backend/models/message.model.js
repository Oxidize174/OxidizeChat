module.exports = (sequelize, Sequelize) => {
    const Message = sequelize.define("message", {
        text: {
            type: Sequelize.STRING
        },
    });

    return Message;
};