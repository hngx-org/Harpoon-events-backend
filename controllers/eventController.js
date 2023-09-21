const db = require('../models');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const EventService = require('./../services/event.service');

const Event = db.events;

exports.createEvent = catchAsync(async (req, res, next) => {
  const event = await EventService.createEvent(req);

  res.status(201).json({
    status: 'success',
    event,
  });
});

// Deleting an event
exports.deleteEvent = catchAsync(async (req, res, next) => {
  const eventId = req.params.eventId;

  await EventService.deleteEvent(eventId, req);
  res.status(204).json({
    status: 'success!',
    data: null,
  });
});

// Updating an Event
exports.updateEvent = catchAsync(async (req, res, next) => {
  const eventId = req.params.eventId;

  const event = await EventService.updateEvent(eventId, req);

  res.status(200).json({
    status: 'success!',
    event,
  });
});

// Getting a single event
exports.getSingleEvent = catchAsync(async (req, res, next) => {
  const eventId = req.params.eventId;

  const event = await EventService.getSingleEvent(eventId);

  res.status(200).json({
    status: 'sucess!',
    event,
  });
});

// Getting all events
exports.getAllEvent = catchAsync(async (req, res, next) => {
  const events = await EventService.getAllEvents();

  if (!events) {
    return next(new AppError(404, 'No events found'));
  }

  res.status(200).json({
    status: 'sucess!',
    events: events,
  });
});
