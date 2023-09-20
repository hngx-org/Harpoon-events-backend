module.exports = (sequelize, Datatypes) => {
  const User = sequelize.define('users', {
    id: {
      type: Datatypes.STRING(60),
      primaryKey: true,
    },
    name: {
      type: Datatypes.STRING(120),
      allowNull: false,
    },
    email: {
      type: Datatypes.STRING(120),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    avatar: {
      type: Datatypes.STRING(255),
    },
  });

  return User;
};
