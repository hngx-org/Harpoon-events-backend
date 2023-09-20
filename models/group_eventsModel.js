module.exports = (sequelize, Datatypes) => {
  // defines the columns for the group_events table
  const GroupEvents = sequelize.define('group_events', {
   
  event_id: {
<<<<<<< HEAD
      type: Datatypes.STRING(60),
=======
      type: Datatypes.STRING,
>>>>>>> master
      allowNull: false,
      // references: {
      //   model: Event,
      //   key: 'id',
      // }
    },
    group_id: {
<<<<<<< HEAD
      type: Datatypes.STRING(60),
=======
      type: Datatypes.STRING,
>>>>>>> master
      allowNull: false,
      // references: {
      //   model: Group,
      //   key: 'id',
      // }
    },
  });

  GroupEvents.removeAttribute('id')

  return GroupEvents;
};
