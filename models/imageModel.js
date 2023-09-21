module.exports = (sequelize, DataTypes) => {
  const Image = sequelize.define('images', {
    id: {
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    url: {
      type: DataTypes.TEXT,
    },
  });

  Image.associate = (models) => {
    // Image relationship with Event (thumbnail)
    Image.hasOne(models.Event, {
      foreignKey: 'thumbnail_id',
      as: 'event_thumbnail',
    });

    // Image relationship with Comment (comment image)
    Image.belongsToMany(models.Comment, {
      through: models.CommentImages,
      foreignKey: 'image_id',
      foreignKeyConstraint: true,
    });

    // Image relationship with Group (group image)
    Image.hasOne(models.Group, {
      foreignKey: 'group_image_id',
      as: 'group_image',
    });
  };

  return Image;
};
