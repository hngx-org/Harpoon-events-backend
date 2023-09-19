const dbConfig = require('./../config/dbConfig');

const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

// authenticate
sequelize
  .authenticate()
  .then(() => {
    console.log('Connected');
  })
  .catch((error) => {
    console.log(error);
  });

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require('./userModel.js')(sequelize, DataTypes);
db.events = require('./eventModel.js')(sequelize, DataTypes);
db.group_events = require('./group_Events_Model')(sequelize, DataTypes);

// make you not loose all you data everytime e as it rewrites data
db.sequelize.sync({ force: false }).then(() => {
  console.log('Yes, re-sync done!');
});

// RelationShips
// db.users.hasMany(db.events, {
//   foreignKey: 'user_id',
//   as: 'event',
// });

// db.events.belongsTo(db.users, {
//   foreignKey: 'user_id',
//   as: 'user',
// });

module.exports = db;
