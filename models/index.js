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

// Import and include all the models
db.users = require('./userModel.js')(sequelize, DataTypes);
db.events = require('./eventModel.js')(sequelize, DataTypes);
db.comments = require('./commentModel.js')(sequelize, DataTypes);
db.groups = require('./groupModel.js')(sequelize, DataTypes);
db.groupEvents = require('./group_eventsModel.js')(sequelize, DataTypes);
db.groupImages = require('./groupImageModel.js')(sequelize, DataTypes);
db.userGroups = require('./user_groupsModel.js')(sequelize, DataTypes);
db.images = require('./imageModel.js')(sequelize, DataTypes);
db.commentImages = require('./comment_imagesModel.js')(sequelize, DataTypes);
db.eventThumbnail = require('./event_thumbnailModel.js')(sequelize, DataTypes);
db.likes = require('./likesModel.js')(sequelize, DataTypes);
db.interestedEvents = require('./interestedEventsModel.js')(sequelize, DataTypes);

// make sure you don't lose all your data every time as it rewrites data
db.sequelize.sync({ force: false }).then(() => {
  console.log('Yes, re-sync done!');
});

module.exports = db;