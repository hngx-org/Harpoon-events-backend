module.exports = (sequelize, Datatypes) => {
  // defines the columns for the user_groups table
  const UserGroups = sequelize.define('user_groups', {
   
  user_id: {
      type: Datatypes.STRING,
      allowNull: false,
      // references: {
      //   model: User,
      //   key: 'id',
      // }
    },
    group_id: {
      type: Datatypes.STRING,
      allowNull: false,
      // references: {
      //   model: Group,
      //   key: 'id',
      // }
    },
  });

  UserGroups.removeAttribute('id')

  return UserGroups;
};
