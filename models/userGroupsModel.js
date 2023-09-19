module.exports = (sequelize, Datatypes) => {
  // defines the columns for the user_groups table
  const UserGroups = sequelize.define('userGroups', {
   
  user_id: {
      type: Datatypes.STRING,
      allowNull: false,
    },
    group_id: {
      type: Datatypes.STRING,
      allowNull: false,
    },
  });

  return UserGroups;
};
