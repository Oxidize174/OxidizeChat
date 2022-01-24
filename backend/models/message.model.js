module.exports = (sequelize, Sequelize) => {
    return sequelize.define("message", {
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
};