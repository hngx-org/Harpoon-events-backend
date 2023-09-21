module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('comments', {
    id: {
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    body: {
      type: DataTypes.TEXT,
    },
    event_id: {
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      references: {
        model: 'events',
        key: 'id',
      },
    },
    user_id: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
    },
  });

  Comment.associate = (models) => {
    // Comment relationship with Event
    Comment.belongsTo(models.Event, {
      foreignKey: 'event_id',
      as: 'event',
    });

    // Comment relationship with User
    Comment.belongsTo(models.User, {
      foreignKey: 'user_id',
      as: 'user',
    });

    // Comment relationship with Image (comment image)
    Comment.belongsToMany(models.Image, {
      through: models.CommentImages,
      foreignKey: 'comment_id',
      as: 'comment_images',
      foreignKeyConstraint: true,
    });

    // Comment relationship with Like
    Comment.belongsToMany(models.User, {
      through: models.Likes,
      foreignKey: 'comment_id',
      as: 'likes',
      foreignKeyConstraint: true,
    });
  };

  return Comment;
};
