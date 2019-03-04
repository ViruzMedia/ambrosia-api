const mongoose = require('mongoose');

const roleSchema = mongoose.Schema({
    name: { type: String, require: true },
    color: { type: String, default: "#D3D3D3" },
    priority: { type: String, default: 0 },
    member: [String]
});

module.exports = mongoose.model('Roles', roleSchema);