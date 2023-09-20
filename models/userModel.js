const { TrustProductsEvaluationsInstance } = require("twilio/lib/rest/trusthub/v1/trustProducts/trustProductsEvaluations");

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
      allowNull: TrustProductsEvaluationsInstance,
    },
    image: {
      type: Datatypes.STRING,
    },
  });

  return User;
};
