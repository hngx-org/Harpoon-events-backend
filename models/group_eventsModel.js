const Event = require('./eventModel'); 
const Group = require('./groupModel');


module.exports = (sequelize, Datatypes) => {
  // defines the columns for the group_events table
  const GroupEvents = sequelize.define('group_events', {
   
  event_id: {
      type: Datatypes.STRING(60),
      allowNull: false,
      references: {
        model: Event,
        key: 'id',
      }
    },
    group_id: {
      type: Datatypes.STRING(60),
      allowNull: false,
      references: {
        model: Group,
        key: 'id',
      }
    },
  });

  GroupEvents.removeAttribute('id')

  return GroupEvents;
};
