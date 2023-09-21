module.exports = (sequelize, DataTypes) => {
  const InterestedEvent = sequelize.define('interested_events', {
    // No need to define an 'id' column, as Sequelize will create it automatically for many-to-many associations
    event_id: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: 'events',
        key: 'id',
      },
      unique: 'unique_event_user_interest',
    },
    user_id: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
      unique: 'unique_event_user_interest',
    },
  }, {
    // Define a unique constraint name for the combination of event_id and user_id
    indexes: [
      {
        unique: true,
        fields: ['event_id', 'user_id'],
        name: 'unique_event_user_interest',
      },
    ],
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

