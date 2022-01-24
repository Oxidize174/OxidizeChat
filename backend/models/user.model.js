module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user", {
        login: {
            type: Sequelize.STRING
        },
        password: {
            type: Sequelize.STRING
        },
        name: {
            type: Sequelize.STRING
        },
    }, {
        scopes: {
            withoutPassword: {
                attributes: {exclude: ['password']},
            }
        }
    });

    return User;
};