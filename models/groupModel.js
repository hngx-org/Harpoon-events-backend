module.exports = (sequelize, DataTypes) => {
  const Group = sequelize.define('groups', {
    id: {
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
    },
  });

  Group.associate = (models) => {
    // Group relationship with Event
    Group.belongsToMany(models.Event, {
      through: models.GroupEvents,
    });
    models.Event.belongsToMany(Group, {
      through: models.GroupEvents,
    });
  };

  return Group;
};
