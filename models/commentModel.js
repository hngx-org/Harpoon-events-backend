module.exports = (sequelize, Datatypes) => {
  const Event = sequelize.define('comment', {
    body: {
      type: Datatypes.TEXT,
      allowNull: false,
    },
    user_id: {
      type: Datatypes.STRING,
      allowNull: false,
    },
    event_id: {
      type: Datatypes.STRING,
      allowNull: false,
    },
  });

  return Comment;
};
