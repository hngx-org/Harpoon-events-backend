module.exports = (sequelize, Datatypes) => {
  const Group = sequelize.define('groups', {
    id: {
      type: Datatypes.STRING(60),
      primaryKey: true,
    },
    title: {
      type: Datatypes.STRING(60),
      allowNull: false,
    },
  });

  return Group;
};
