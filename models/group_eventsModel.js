const Event = require('./eventModel'); 
const Group = require('./groupModel');
module.exports = (sequelize, Datatypes) => {
  // defines the columns for the group_events table
  const Group_events = sequelize.define('group_events', {
   
  event_id: {
      type: Datatypes.STRING,
      allowNull: false,
    },
    group_id: {
      type: Datatypes.STRING,
      allowNull: false,
    },
  });

  // Define the foreign key relationships
  Group_events.belongsTo(Event, { foreignKey: 'event_id' });
  Group_events.belongsTo(Group, { foreignKey: 'group_id' });

  return Group_events;
};
