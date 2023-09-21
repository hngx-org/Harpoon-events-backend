module.exports = (sequelize, DataTypes) => {
  const EventThumbnail = sequelize.define('event_thumbnail', {
    // No need to define an 'id' column, as Sequelize will create it automatically for one-to-one associations
    image_id: {
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      references: {
        model: 'images',
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

  EventThumbnail.associate = (models) => {
    // Define associations as needed
    EventThumbnail.belongsTo(models.Image, {
      foreignKey: 'image_id',
      as: 'thumbnail_image',
    });

    EventThumbnail.belongsTo(models.Event, {
      foreignKey: 'event_id',
      as: 'event',
    });
  };

  return EventThumbnail;
};
