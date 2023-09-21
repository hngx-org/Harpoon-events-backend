const db = require('../models');
const AppError = require('../utils/appError');

const Event = db.events;

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
 * @returns {Promise<Object>} A promise that resolves to the created event object.
 * @throws {AppError} If the event creation is not successful.
 */
exports.createEvent = async (req) => {
  const info = {
    title: req.body.title,
    description: req.body.description,
    creator: req.user.id,
    location: req.body.location,
    start_time: req.body.start_time,
    end_time: req.body.end_time,
    start_date: req.body.start_date,
    end_date: req.body.end_date,
    image: req.body.image,
  };
  const event = await Event.create(info);

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
  if (event.creator !== req.user.id) {
    throw new AppError('Access to delete event not granted.');
  }

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
 * @param {string} req.body.image - The updated image URL for the event.
 * @returns {Promise<Object|null>} A promise that resolves to the updated event object or null if not found.
 * @throws {AppError} If the event is not found or the user doesn't have access to update the event.
 */
exports.updateEvent = async (eventId, req) => {
  const event = await Event.findByPk(eventId);

  if (!event) {
    throw new AppError('Event not found', 404);
  }

  // Check to determine if the user making the request is the creator of the event
  if (event.creator !== req.user.id) {
    throw new AppError('Access to update event not granted.');
  }

  const updatedInfo = {
    title: req.body.title,
    description: req.body.description,
    creator: req.user.id,
    location: req.body.location,
    start_time: req.body.start_time,
    end_time: req.body.end_time,
    start_date: req.body.start_date,
    end_date: req.body.end_date,
    image: req.body.image,
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

  return event;
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
