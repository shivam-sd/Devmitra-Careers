const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
job: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'JobPost',
    required: true
},

name: {
    type: String,
    required: true
},

email: {
    type: String,
    required: true
},

contactNumber: {
    type: String,
    required: true
},

github: {
    type: String
},

linkedin: {
    type: String
},

resume: {
    type: String
},

coverLetter: {
    type: String
},

appliedAt: {
    type: Date, default: Date.now
}
});

module.exports = mongoose.model('Application', applicationSchema);