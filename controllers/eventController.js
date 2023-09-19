const db = require('../models');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

const Event = db.events;

exports.createEvent = catchAsync(async (req, res, next) => {
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
    return next(new AppError('Event not created successfully', 400));
  }

  res.status(201).json({
    status: 'success',
    event,
  });
});

// Deleting an event
exports.deleteEvent = catchAsync(async (req, res, next) => {
  const eventId = req.params.id;
  const event = await Event.findByPk(eventId);

  if (!event) {
    return next(new AppError('Event unavailable', 404));
  }

  // check to determine if user making request is creator of event
  if (event.creator !== req.user.id) {
    return next(new AppError('Access to delete event not granted.'));
  }

  await Event.destroy({
    where: { id: eventId },
  });

  res.status(204).json({
    status: 'success!',
    data: null,
  });
});

// Updating an Event
exports.updateEvent = catchAsync(async (req, res, next) => {
  const eventId = req.params.id;

  const event = await Event.findByPk(eventId);
  if (!event) {
    return next(new AppError('Event not found', 404));
  }

  // check to determine if user making request is creator of event
  if (event.creator !== req.user.id) {
    return next(new AppError(`Access to update event not granted.`));
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

  const updatedEvent = await Event.findByPk(eventId);

  res.status(200).json({
    status: 'success!',
    event: updatedEvent,
  });
});

// Getting a single event
exports.getSingleEvent = catchAsync(async (req, res, next) => {
  const eventId = req.params.id;

  const event = await Event.findByPk(eventId);

  if (!event) {
    return next(new AppError(404, 'Event not found'));
  }

  res.status(200).json({
    status: 'sucess!',
    event,
  });
});

// Getting all events
exports.getAllEvent = catchAsync(async (req, res, next) => {
  const events = await Event.findALL();
  res.status(200).json({
    status: 'sucess!',
    events: events,
  });
});
