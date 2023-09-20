const User = require('./userModel'); 
const Group = require('./groupModel');

module.exports = (sequelize, Datatypes) => {
  // defines the columns for the user_groups table
  const User_groups = sequelize.define('user_groups', {
   
  user_id: {
      type: Datatypes.STRING,
      allowNull: false,
    },
    group_id: {
      type: Datatypes.STRING,
      allowNull: false,
    },
  });
  
// Define the foreign key relationships
  User_groups.belongsTo(User, { foreignKey: 'user_id' });
  User_groups.belongsTo(Group, { foreignKey: 'group_id' });


  return User_groups;
};
