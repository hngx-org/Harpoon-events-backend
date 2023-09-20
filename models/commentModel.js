// const User = require('./userModel');
// const Event = require('./eventModel');


module.exports = (sequelize, Datatypes) => {
  const Comment = sequelize.define('comments', {
    id: {
      type: Datatypes.STRING(60),
      primaryKey: true,
    },
    body: {
      type: Datatypes.STRING(1024),
      allowNull: false,
    },
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

  return Comment;
};
