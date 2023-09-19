module.exports = (sequelize, Datatypes) => {
  // defines the columns for the user_groups table
  const User_groups = sequelize.define('user_groups', {
   
  user_id: {
      type: Datatypes.NUMERIC,
      allowNull: false,
    },
    group_id: {
      type: Datatypes.NUMERIC,
      allowNull: false,
    },
  });

  return User_groups;
};
