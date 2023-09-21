module.exports = (sequelize, DataTypes) => {
  const CommentImages = sequelize.define('comment_images', {
    // No need to define an 'id' column, as Sequelize will create it automatically for many-to-many associations
    comment_id: {
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      references: {
        model: 'comments',
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
  CommentImages.associate = (models) => {
    CommentImages.belongsTo(models.Comment, {
      foreignKey: 'comment_id',
      foreignKeyConstraint: true,
    });
    CommentImages.belongsTo(models.Image, {
      foreignKey: 'image_id',
      foreignKeyConstraint: true,
    });
  };

  return CommentImages;
};
