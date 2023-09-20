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
    foreignKey: "creator", // Use the correct foreign key
  });
  Event.belongsTo(User, {
    foreignKey: "creator", // Match the foreign key specified above
  });

  // User relationship with as Interested_Events
  User.belongsToMany(Event, {
    through: InterestedEvents,
    key: 'user_id',
  });
  Event.belongsToMany(User, {
    through: InterestedEvents,
    key: 'event_id',
  });

  // User relationship with Comments
  User.hasMany(Comments);
  Comments.belongsTo(User);

  return User;
};
