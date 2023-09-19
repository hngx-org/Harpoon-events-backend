const db = require('../models');
const AppError = require('../utils/appError');

const Event = db.events;

exports.creatEvent = async (req) => {
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

exports.deleteEvent = async (eventId) => {
    const event = await Event.findByPk(eventId);

    if (!event) {
        throw new AppError('Event unavailable', 404);
    }

    // check to determine if user making request is creator of event
    if (event.creator !== req.user.id) {
        throw new AppError('Access to delete event not granted.');
    }

    return await Event.destroy({
        where: { id: eventId },
    });
};

exports.updateEvent = async (eventId, req) => {
    const event = await Event.findByPk(eventId);

    if (!event) {
        throw new AppError('Event not found', 404);
    }

    // check to determine if user making request is creator of event
    if (event.creator !== req.user.id) {
        throw new AppError(`Access to update event not granted.`);
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

exports.getSingleEvent = async (eventId) => {
    const event = await Event.findByPk(eventId);

    if (!event) {
        throw new AppError('Event not found', 404);
    }

    return event;
};

exports.getAllEvents = async () => {
    const events = await Event.findAll();
    return events;
};
