module.exports = (sequelize, Datatypes) => {
  const Group = sequelize.define('group', {
    title: {
      type: Datatypes.STRING,
      allowNull: false,
    },
  });

  return Group;
};
