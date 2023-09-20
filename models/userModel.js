module.exports = (sequelize, Datatypes) => {
  const User = sequelize.define('users', {
    id: {
      type: Datatypes.STRING(60),
      primaryKey: true,
    },
    name: {
      type: Datatypes.STRING(120),
      allowNull: false,
    },
    email: {
      type: Datatypes.STRING(120),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    avatar: {
      type: Datatypes.STRING(255),
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
      foreignKey: "creator",
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
  }

  return User;
};
