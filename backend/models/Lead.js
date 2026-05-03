const mongoose = require("mongoose");

const leadSchema = new mongoose.Schema({
    name: String,
    phone: String,
    course: String,
    source: String,
    status: String,
    followup: String,
    notes: String
});

module.exports = mongoose.model("Lead", leadSchema);