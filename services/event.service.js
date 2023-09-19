const db = require('../models');

const Event = db.events;

exports.getAllEvents = async () => {
    const events = await Event.findAll();
    return events;
}