const { Sequelize } = require('sequelize');
const db = require('../models');
const AppError = require('../utils/appError');
const { ADDRGETNETWORKPARAMS } = require('dns');

const Event = db.events;
const Comment = db.comments;
const Group = db.groups;
const GroupEvent = db.groupEvents;
const LikeComment = db.likes;

const EventThumNail = db.eventThumbnail;
const Image = db.images;

/**
 * Creates a new event.
 *
 * @param {object} req - The request object containing event details.
 * @param {string} req.body.title - The title of the event.
 * @param {string} req.body.description - The description of the event.
 * @param {string} req.user.id - The ID of the event creator.
 * @param {string} req.body.location - The location of the event.
 * @param {string} req.body.start_time - The start time of the event.
 * @param {string} req.body.end_time - The end time of the event.
 * @param {string} req.body.start_date - The start date of the event.
 * @param {string} req.body.end_date - The end date of the event.
 * @param {string} req.body.image - The image URL for the event.
 * @param {string} req.body.group_id - The group id that the event would belong to.
 * @returns {Promise<Object>} A promise that resolves to the created event object.
 * @throws {AppError} If the event creation is not successful.
 */
exports.createEvent = async (req) => {
  const { group_id } = req.body;
  const info = {
    title: req.body.title,
    description: req.body.description,
    creator_id: req.user.id,
    location: req.body.location,
    start_time: req.body.start_time,
    end_time: req.body.end_time,
    start_date: req.body.start_date,
    end_date: req.body.end_date,
  };
  const group = await Group.findByPk(req.body.group_id);

  if (!group) {
    throw new AppError('Group does not exist', 404);
  }

  const event = await Event.create(info);
  await GroupEvent.create({ group_id, event_id: event.id });

  if (!event) {
    throw new AppError('Event not created successfully', 400);
  }

  return event;
};

/**
 * Deletes an event by its ID.
 *
 * @param {number | string} eventId - The ID of the event to delete.
 * @param {object} req - The request object containing user details.
 * @param {string} req.user.id - The ID of the user making the request.
 * @returns {Promise<number>} A promise that resolves to the number of deleted events (0 or 1).
 * @throws {AppError} If the event is unavailable or the user doesn't have access to delete the event.
 */
exports.deleteEvent = async (eventId, req) => {
  const event = await Event.findByPk(eventId);

  if (!event) {
    throw new AppError('Event unavailable', 404);
  }

  // Check to determine if the user making the request is the creator of the event
  if (event.creator_id !== req.user.id) {
    throw new AppError('Access to delete event not granted.');
  }

  // delete comments associated with event
  await Comment.destroy({ where: { event_id: eventId } });
  return await Event.destroy({
    where: { id: eventId },
  });
};

/**
 * Updates an event by its ID.
 *
 * @param {number | string} eventId - The ID of the event to update.
 * @param {object} req - The request object containing updated event details.
 * @param {string} req.body.title - The updated title of the event.
 * @param {string} req.body.description - The updated description of the event.
 * @param {string} req.user.id - The ID of the user making the request.
 * @param {string} req.body.location - The updated location of the event.
 * @param {string} req.body.start_time - The updated start time of the event.
 * @param {string} req.body.end_time - The updated end time of the event.
 * @param {string} req.body.start_date - The updated start date of the event.
 * @param {string} req.body.end_date - The updated end date of the event.
 * @returns {Promise<Object|null>} A promise that resolves to the updated event object or null if not found.
 * @throws {AppError} If the event is not found or the user doesn't have access to update the event.
 */
exports.updateEvent = async (eventId, req) => {
  const event = await Event.findByPk(eventId);

  if (!event) {
    throw new AppError('Event not found', 404);
  }

  // Check to determine if the user making the request is the creator of the event
  if (event.creator_id !== req.user.id) {
    throw new AppError('Access to update event not granted.');
  }

  const updatedInfo = {
    title: req.body.title,
    description: req.body.description,
    creator_id: req.user.id,
    location: req.body.location,
    start_time: req.body.start_time,
    end_time: req.body.end_time,
    start_date: req.body.start_date,
    end_date: req.body.end_date,
  };
  await Event.update(updatedInfo, {
    where: { id: eventId },
  });

  return await Event.findByPk(eventId);
};

/**
 * Retrieves a single event by its ID.
 *
 * @param {number | string} eventId - The ID of the event to retrieve.
 * @returns {Promise<Object|null>} A promise that resolves to the retrieved event object or null if not found.
 * @throws {AppError} If the event is not found.
 */
exports.getSingleEvent = async (eventId) => {
  const event = await Event.findByPk(eventId);

  if (!event) {
    throw new AppError('Event not found', 404);
  }

  const comments = await Comment.findAll({ where: { event_id: eventId } });
  const eventThumNail = await EventThumNail.findOne({
    where: { event_id: eventId },
  });

  let thumbnail;
  if (!eventThumNail) {
    thumbnail = null;
  } else {
    thumbnail = await Image.findByPk(eventThumNail.image_id);
  }

  const likes = await LikeComment.findAll({
    attributes: [
      'comment_id',
      [Sequelize.fn('COUNT', Sequelize.col('*')), 'like_count'],
    ],
    where: { comment_id: comments.map((each) => each.id) },
    group: ['comment_id'],
  });

  return { ...event.dataValues, comments, likes, thumbnail };
};

/**
 * Retrieves all events.
 *
 * @returns {Promise<Array<Object>>} A promise that resolves to an array of all events.
 */
exports.getAllEvents = async () => {
  const events = await Event.findAll();
  return events;
};

exports.addThumbNailToEvent = async (req) => {
  const url = req.body.url;
  const event_id = req.params.eventId;

  if (!url || !event_id) {
    throw new AppError('Supply image url and eventId', 400);
  }

  const image = await Image.create({ url });
  if (!image) {
    throw new AppError('Image creation unsuccessful', 400);
  }

  const eventThumbNail = await EventThumNail.create({
    image_id: image.id,
    event_id,
  });

  return { image, eventThumbNail };
};
