const mongoose = require('mongoose');

const routeSchema = mongoose.Schema({
    name: { type: String, require: true, unique: true },
    route: { type: String, require: true, unique: true },
    needed_priority: { type: Number, default: 0 },
    needed_role: { type: String, require: true }
});

module.exports = mongoose.model('Routen', routeSchema);