module.exports = (sequelize, Datatypes) => {
  const Event = sequelize.define('event', {
    title: {
      type: Datatypes.STRING,
      allowNull: false,
    },
    description: {
      type: Datatypes.TEXT,
      allowNull: false,
    },
    creator: {
      type: Datatypes.STRING,
      allowNull: false,
    },
    location: {
      type: Datatypes.STRING,
      allowNull: false,
    },
    start_time: {
      type: Datatypes.STRING,
      allowNull: false,
    },
    end_time: {
      type: Datatypes.STRING,
      allowNull: false,
    },
    start_date: {
      type: Datatypes.STRING,
      allowNull: false,
    },
    end_date: {
      type: Datatypes.STRING,
      allowNull: false,
    },
    image: {
      type: Datatypes.STRING,
      allowNull: false,
    },
  });

  return Event;
};
