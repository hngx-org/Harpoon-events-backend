// const User = require('./userModel');
// const Event = require('./eventModel'); 


module.exports = (sequelize, Datatypes) => {
  // defines the columns for the group_events table
  const InterestedEvents = sequelize.define('interested_events', {
      
    user_id: {
      type: Datatypes.STRING(60),
      allowNull: false,
      // references: {
      //   model: User,
      //   key: 'id',
      // }
    },
    event_id: {
      type: Datatypes.STRING(60),
      allowNull: false,
      // references: {
      //   model: Event,
      //   key: 'id',
      // }
    },
  });

  InterestedEvents.removeAttribute('id')

  return InterestedEvents;
};
