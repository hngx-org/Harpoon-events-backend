module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('users', {
    id: {
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV4,
      allowNull: true,
    },
    image: {
      type: DataTypes.STRING,
    },
  });

  User.associate = (models) => {
    // User relationships with Group
    User.belongsToMany(models.Group, {
      through: models.UserGroups,
    });
    models.Group.belongsToMany(User, {
      through: models.UserGroups,
    });

    // User relationship with Event
    User.hasMany(models.Event, {
      foreignKey: 'creator',
    });
    models.Event.belongsTo(User);

    // User relationship with as Interested_Events
    User.belongsToMany(models.Event, {
      through: models.InterestedEvents,
      foreignKey: 'user_id',
    });
    models.Event.belongsToMany(User, {
      through: models.InterestedEvents,
      foreignKey: 'event_id',
    });

    // User relationship with Comments
    User.hasMany(models.Comments);
    models.Comments.belongsTo(User);
  };

  return User;
};
