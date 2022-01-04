module.exports = (sequelize, Sequelize) => {
    const Message = sequelize.define("message", {
        text: {
            type: Sequelize.TEXT
        },
        userFrom: {
            type: Sequelize.INTEGER,
            references: {
                model: "users",
                key: 'id'
            }
        },
        userTo: {
            type: Sequelize.INTEGER,
            references: {
                model: "users",
                key: 'id'
            }
        },
    });

    return Message;
};