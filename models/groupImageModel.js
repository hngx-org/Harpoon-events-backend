module.exports = (sequelize, DataTypes) => {
  const GroupImages = sequelize.define('group_images', {
    // No need to define an 'id' column, as Sequelize will create it automatically for many-to-many associations
    group_id: {
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      references: {
        model: 'groups',
        key: 'id',
      },
    },
    image_id: {
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      references: {
        model: 'images',
        key: 'id',
      },
    },
  });

  // Define associations
  GroupImages.associate = (models) => {
    GroupImages.belongsTo(models.Group, {
      foreignKey: 'group_id',
      foreignKeyConstraint: true,
    });
    GroupImages.belongsTo(models.Image, {
      foreignKey: 'image_id',
      foreignKeyConstraint: true,
    });
  };

  return GroupImages;
};
