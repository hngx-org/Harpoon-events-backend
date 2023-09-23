const dbConfig = require('./../config/dbConfig');

const { Sequelize, DataTypes } = require('sequelize');

/**
 * Configuration and connection to the database.
 * @typedef {Object} DbConfig
 * @property {string} DB - The name of the database.
 * @property {string} USER - The database user.
 * @property {string} PASSWORD - The database password.
 * @property {string} HOST - The database host.
 * @property {string} dialect - The database dialect (e.g., 'mysql', 'postgres').
 * @property {Object} pool - Pool configuration object.
 * @property {number} pool.max - Maximum number of database connections in the pool.
 * @property {number} pool.min - Minimum number of database connections in the pool.
 * @property {number} pool.acquire - Maximum time, in milliseconds, that the pool will try to get connection.
 * @property {number} pool.idle - Maximum time, in milliseconds, that a connection can be idle before being released.
 */

/**
 * Represents the database connection and schema.
 * @typedef {Object} Db
 * @property {Object} Sequelize - The Sequelize instance.
 * @property {Object} sequelize - The Sequelize connection object.
 * @property {Object} users - The User model.
 * @property {Object} events - The Event model.
 * @property {Object} comments - The Comment model.
 * @property {Object} groups - The Group model.
 * @property {Object} groupEvents - The GroupEvents model.
 * @property {Object} groupImage - The GroupImage model.
 * @property {Object} userGroups - The UserGroups model.
 * @property {Object} images - The Image model.
 * @property {Object} commentImages - The CommentImages model.
 * @property {Object} eventThumbnail - The EventThumbnail model.
 * @property {Object} likes - The Likes model.
 * @property {Object} interestedEvents - The InterestedEvents model.
 */

// Create a Sequelize instance and connect to the database
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,
  define: {
    timestamps: false,
    freezeTableName: true,
  },
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

// Authenticate the database connection
sequelize
  .authenticate()
  .then(() => {
    console.log('Connected');
  })
  .catch((error) => {
    console.log(error);
  });

/**
 * The database object containing the Sequelize instance and models.
 * @type {Db}
 */
const db = {};

// Import and include all the models
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.users = require('./userModel.js')(sequelize, DataTypes);
db.events = require('./eventModel.js')(sequelize, DataTypes);
db.group_events = require('./group_Events_Model')(sequelize, DataTypes);
db.comments = require('./commentModel.js')(sequelize, DataTypes);
db.groups = require('./groupModel.js')(sequelize, DataTypes);
db.groupEvents = require('./group_eventsModel.js')(sequelize, DataTypes);
db.groupImage = require('./groupImageModel.js')(sequelize, DataTypes);
db.userGroups = require('./user_groupsModel.js')(sequelize, DataTypes);
db.images = require('./imageModel.js')(sequelize, DataTypes);
db.commentImages = require('./comment_imagesModel.js')(sequelize, DataTypes);
db.eventThumbnail = require('./event_thumbnailModel.js')(sequelize, DataTypes);
db.likes = require('./likesModel.js')(sequelize, DataTypes);
db.interestedEvents = require('./interestedEventsModel.js')(sequelize, DataTypes);

// Synchronize the database (create tables if they don't exist)
db.sequelize.sync({ force: false }).then(() => {
  console.log('Database synchronization complete.');
});

/**
 * Export the database object.
 * @module db
 * @type {Db}
 */
module.exports = db;
