const Event = require('./eventModel');
const GroupEvents = require('./group_eventsModel');

module.exports = (sequelize, Datatypes) => {
  const Group = sequelize.define('groups', {
    id: {
      type: Datatypes.STRING(60),
      primaryKey: true,
    },
    title: {
      type: Datatypes.STRING(60),
      allowNull: false,
    },
  });


  // Group relationship with Event
  Group.belongsToMany(Event, {
    through: GroupEvents,
  });
  Event.belongsToMany(Group, {
    through: GroupEvents
  });

  return Group;
};
