module.exports = (sequelize, DataTypes) => {
  const Like = sequelize.define('likes', {
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
    comment_id: {
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      references: {
        model: 'comments',
        key: 'id',
      },
    },
  });

  Like.associate = (models) => {
    // Define associations as needed
    Like.belongsTo(models.User, {
      foreignKey: 'user_id',
      as: 'user',
    });

    Like.belongsTo(models.Comment, {
      foreignKey: 'comment_id',
      as: 'comment',
    });
  };

  return Like;
};
