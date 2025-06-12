const Application = require('../models/Application');
const { sendThankYouEmail } = require('../utils/emailService');

// POST /applications
exports.createApplication = async (req, res) => {
  try {
    const { job, name, email,contactNumber, github, linkedin, resume, coverLetter } = req.body;
    const application = new Application({ job, name, email, contactNumber, github, linkedin, resume, coverLetter });
    await application.save();
    res.status(201).json(application);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// GET /applications/:jobId
exports.getApplicationsByJob = async (req, res) => {
  try {
    const { jobId } = req.params;
    const applications = await Application.find({ job: jobId });
    res.json(applications);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.sendTestEmail = async (req, res) => {
  try {
    const { email, name } = req.body;
    if (!email || !name) {
      return res.status(400).json({ error: 'Email and name are required.' });
    }
    await sendThankYouEmail(email, name);
    res.status(200).json({ message: 'Test email sent successfully.' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to send email.' });
  }
};