module.exports = (sequelize, Datatypes) => {
  const Group = sequelize.define('groups', {
    id: {
      type: Datatypes.STRING(60),
      primaryKey: true,
    },
    title: {
      type: Datatypes.STRING(60),
      allowNull: false,
    },
  });

  Group.associate = (models) => {
    // Group relationship with Event
    Group.belongsToMany(models.Event, {
      through: models.GroupEvents,
    });
    models.Event.belongsToMany(Group, {
      through: models.GroupEvents
    });
  }

  return Group;
};
