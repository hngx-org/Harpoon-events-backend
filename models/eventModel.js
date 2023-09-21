module.exports = (sequelize, DataTypes) => {
  const Event = sequelize.define('events', {
    id: {
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    title: {
      type: DataTypes.TEXT,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
    },
    creator: {
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
    },
    location: {
      type: DataTypes.TEXT,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
    },
    start_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    end_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    start_time: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    end_time: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    thumbnail: {
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
    },
  });

  Event.associate = (models) => {
    // Event relationship with User (creator)
    Event.belongsTo(models.User, {
      foreignKey: 'creator',
      as: 'creator',
    });

    // Event relationship with Image (thumbnail)
    Event.belongsTo(models.Image, {
      foreignKey: 'thumbnail_id',
      as: 'thumbnail',
    });

    // Event relationships with Group
    Event.belongsToMany(models.Group, {
      through: models.GroupEvents,
    });
    models.Group.belongsToMany(Event, {
      through: models.GroupEvents,
    });

    // Event relationship with Comment
    Event.hasMany(models.Comment, {
      foreignKey: 'event_id',
    });
  };
  return Event;
};
