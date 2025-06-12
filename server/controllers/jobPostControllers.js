const JobPost = require('../models/JobPost');

exports.createJobPost = async (req, res) => {
  try {
    const { title, description, category, location, type, salaryRange, experienceRequired } = req.body;

    const job = await JobPost.create({
      title,
      description,
      category,
      location,
      type,
      salaryRange,
      experienceRequired,
      postedBy: req.admin.id,
    });

    res.status(201).json({ msg: 'Job posted successfully', job });
  } catch (err) {
    res.status(500).json({ msg: 'Failed to post job', error: err.message });
  }
};

exports.getAllJobs = async (req, res) => {
  try {
    const jobs = await JobPost.find().populate('postedBy', 'name email');
    res.status(200).json(jobs);
  } catch (err) {
    res.status(500).json({ msg: 'Failed to fetch jobs', error: err.message });
  }
};

exports.getJobById = async (req, res) => {
  try {
    const job = await JobPost.findById(req.params.id).populate('postedBy', 'name email');
    if (!job) return res.status(404).json({ msg: 'Job not found' });

    res.status(200).json(job);
  } catch (err) {
    res.status(500).json({ msg: 'Failed to fetch job', error: err.message });
  }
};

exports.getJobsByName = async (req, res) => {
  try {
    const { title } = req.query; 
    if (!title) {
      return res.status(400).json({ msg: 'Job name is required in query parameter' });
    }
    // Case-insensitive search for job title
    const jobs = await JobPost.find({ title: { $regex: title, $options: 'i' } }).populate('postedBy', 'name email');
    res.status(200).json(jobs);
  } catch (err) {
    res.status(500).json({ msg: 'Failed to fetch jobs by name', error: err.message });
  }
};

exports.deleteJob = async (req, res) => {
  try {
    const job = await JobPost.findByIdAndDelete(req.params.id);
    if (!job) return res.status(404).json({ msg: 'Job not found' });

    res.status(200).json({ msg: 'Job deleted' });
  } catch (err) {
    res.status(500).json({ msg: 'Failed to delete job', error: err.message });
  }
};
exports.updateJob = async (req, res) => {
  try {
    const { title, description, category, location, type, salaryRange, experienceRequired } = req.body;

    const job = await JobPost.findByIdAndUpdate(
      req.params.id,
      { title, description, category, location, type, salaryRange, experienceRequired },
      { new: true }
    );

    if (!job) return res.status(404).json({ msg: 'Job not found' });

    res.status(200).json({ msg: 'Job updated successfully', job });
  } catch (err) {
    res.status(500).json({ msg: 'Failed to update job', error: err.message });
  }
};