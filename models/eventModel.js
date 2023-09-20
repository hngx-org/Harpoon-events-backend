module.exports = (sequelize, Datatypes) => {
  const Event = sequelize.define('events', {
    id: {
      type: Datatypes.STRING(60),
      primaryKey: true
    },
    title: {
      type: Datatypes.STRING(60),
      allowNull: false,
    },
    description: {
      type: Datatypes.STRING(255),
      allowNull: false,
    },
    creator: {
      type: Datatypes.STRING(60),
      allowNull: false,
    },
    location: {
      type: Datatypes.STRING(1024),
      allowNull: false,
    },
    start_date: {
      type: Datatypes.DATEONLY,
      allowNull: false,
    },
    end_date: {
      type: Datatypes.DATEONLY,
      allowNull: false,
    },
    start_time: {
      type: Datatypes.TIME,
      allowNull: false,
    },
    end_time: {
      type: Datatypes.TIME,
      allowNull: false,
    },
    thumbnail: {
      type: Datatypes.STRING(255),
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
