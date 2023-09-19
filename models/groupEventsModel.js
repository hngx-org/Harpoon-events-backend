module.exports = (sequelize, Datatypes) => {
  // defines the columns for the group_events table
  const GroupEvents = sequelize.define('groupEvents', {
   
  event_id: {
      type: Datatypes.STRING,
      allowNull: false,
    },
    group_id: {
      type: Datatypes.STRING,
      allowNull: false,
    },
  });

  return GroupEvents;
};
