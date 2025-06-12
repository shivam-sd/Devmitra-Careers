const mongoose = require('mongoose');

const jobPostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Job title is required'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Job description is required']
  },
  category: {
    type: String,
    // enum: ['Web Development', 'App Development', 'UI/UX Design', 'Marketing', 'SEO', 'Other'],
    required: [true, 'Job category is required']
  },
  location: {
    type: String,
    default: 'Remote'
  },
  type: {
    type: String,
    enum: ['Full-Time', 'Part-Time', 'Contract', 'Internship', 'Freelance'],
    default: 'Full-Time'
  },
  salaryRange: {
    min: { type: Number, default: 0 },
    max: { type: Number, default: 0 }
  },
  experienceRequired: {
    type: String,
    default: '0+ years'
  },
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Admin',
    required: true
  },
  applicants: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  status: {
    type: String,
    enum: ['Open', 'Closed'],
    default: 'Open'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: Date
});

jobPostSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('JobPost', jobPostSchema);
