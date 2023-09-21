module.exports = (sequelize, DataTypes) => {
  const InterestedEvent = sequelize.define('interested_events', {
    // No need to define an 'id' column, as Sequelize will create it automatically for many-to-many associations
    event_id: {
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      references: {
        model: 'events',
        key: 'id',
      },
    },
    user_id: {
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
    },
  });

  InterestedEvent.associate = (models) => {
    // Define associations as needed
    InterestedEvent.belongsTo(models.Event, {
      foreignKey: 'event_id',
      as: 'event',
    });

    InterestedEvent.belongsTo(models.User, {
      foreignKey: 'user_id',
      as: 'user',
    });
  };

  return InterestedEvent;
};
