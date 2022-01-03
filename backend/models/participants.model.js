module.exports = (sequelize, Sequelize) => {
    const Participants = sequelize.define("participants", {
        userId: {
            type: Sequelize.INTEGER,
            references: {
                model: "user",
                key: 'id'
            }
        },
        groupId: {
            type: Sequelize.INTEGER,
            references: {
                model: "group",
                key: 'id'
            }
        }
    });

    return Participants;
};