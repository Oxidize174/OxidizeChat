module.exports = (sequelize) => {
    const { participants, message, group, user } = sequelize.models;

    user.hasMany(message)
    group.hasMany(message);
    message.belongsTo(user);
    message.belongsTo(group);
    group.belongsToMany(user, { through: participants });
    user.belongsToMany(group, { through: participants });
}