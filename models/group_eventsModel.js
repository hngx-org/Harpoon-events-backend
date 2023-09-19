module.exports = (sequelize, Datatypes) => {
  // defines the columns for the group_events table
  const Group_events = sequelize.define('group_events', {
   
  event_id: {
      type: Datatypes.NUMERIC,
      allowNull: false,
    },
    group_id: {
      type: Datatypes.NUMERIC,
      allowNull: false,
    },
  });

  return Group_events;
};
