module.exports = (sequelize, Datatypes) => {
  const User = sequelize.define('user', {
    name: {
      type: Datatypes.STRING,
      allowNull: false,
    },
    email: {
      type: Datatypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: Datatypes.STRING,
      allowNull: true,
    },
    image: {
      type: Datatypes.STRING,
    },
  });

  return User;
};
