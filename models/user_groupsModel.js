module.exports = (sequelize, DataTypes) => {
  const UserGroup = sequelize.define('user_groups', {
    // No need to define an 'id' column, as Sequelize will create it automatically for many-to-many associations
    user_id: {
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
    },
    group_id: {
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      references: {
        model: 'groups',
        key: 'id',
      },
    },
  });

  UserGroup.associate = (models) => {
    // Define associations as needed
    UserGroup.belongsTo(models.User, {
      foreignKey: 'user_id',
      as: 'user',
    });

    UserGroup.belongsTo(models.Group, {
      foreignKey: 'group_id',
      as: 'group',
    });
  };

  return UserGroup;
};
