module.exports = (sequelize, DataTypes) => {
  const GroupEvent = sequelize.define('group_events', {
    // No need to define an 'id' column, as Sequelize will create it automatically for many-to-many associations
    group_id: {
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      references: {
        model: 'groups',
        key: 'id',
      },
    },
    event_id: {
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      references: {
        model: 'events',
        key: 'id',
      },
    },
  });

  GroupEvent.associate = (models) => {
    // Define associations as needed
    GroupEvent.belongsTo(models.Group, {
      foreignKey: 'group_id',
      as: 'group',
    });

    GroupEvent.belongsTo(models.Event, {
      foreignKey: 'event_id',
      as: 'event',
    });
  };

  return GroupEvent;
};
