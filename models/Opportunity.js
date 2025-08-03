const mongoose = require('mongoose');

const opportunitySchema = new mongoose.Schema({
    company: { type: String, required: true },
    role: { type: String, required: true },
    type: { type: String, enum: ['Internship', 'Placement'], required: true },
    deadline: { type: Date },
    status: { type: String, enum: ['Not Applied', 'Applied', 'Interviewed', 'Offered', 'Rejected'], default: 'Not Applied' },
    link: String,
    notes: String
}, { timestamps: true });

module.exports = mongoose.model('Opportunity', opportunitySchema);
