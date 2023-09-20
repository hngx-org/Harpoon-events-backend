const Group = require('./groupModel');
const UserGroups = require('./user_groupsModel');
const Comments = require('./commentModel');
const Event = require('./eventModel');
const InterestedEvents = require('./interestedEventsModel');

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

  // User relationships with Group
  User.belongsToMany(Group, {
    through: UserGroups,
  });
  Group.belongsToMany(User, {
    through: UserGroups,
  });

  // User relationship with Event
  User.hasMany(Event, {
    foreignKey: "creator",
  });
  Event.belongsTo(User);

  // User relationship with Comments
  User.hasMany(Comments);
  Comments.belongsTo(User);

  return User;
};
