const express = require('express');
const router = express.Router();
const applicationController = require('../controllers/applicationController');

// Job Application Routes
router.post('/', applicationController.createApplication);
router.get('/:jobId', applicationController.getApplicationsByJob);

// Email Service Route
router.post('/send-email', applicationController.sendTestEmail);

module.exports = router;