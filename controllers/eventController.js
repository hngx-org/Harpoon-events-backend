const db = require('../models');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const EventService = require('./../services/event.service');

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
    return next(new AppError('User not created successfully', 400));
  }

  res.status(201).json({
    status: 'success',
    user: event,
  });
});

exports.deleteEvent = catchAsync(async (req, res, next) => { });

exports.updateEvent = catchAsync(async (req, res, next) => { });

exports.getSingleEvent = catchAsync(async (req, res, next) => { });

exports.getAllEvents = catchAsync(async (req, res, next) => {
  const events = await EventService.getAllEvents();

  if (!events) {
    return next(new AppError('No events found', 404));
  }

  res.status(200).json({
    status: 'Events fetched successfully',
    events,
  });
});
