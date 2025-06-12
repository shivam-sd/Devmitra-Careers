const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminControllers');
const jobController = require('../controllers/jobPostControllers');
const adminAuth = require('../middlewares/adminAuth');

//Admin Login and Signup Routes
router.post('/signup', adminController.adminSignup);
router.post('/login', adminController.adminLogin);
router.get('/profile', adminAuth, adminController.getAdminProfile);

//Job Post Routes
router.post('/', adminAuth, jobController.createJobPost);
router.get('/', jobController.getAllJobs);
router.get('/:id', jobController.getJobById);
router.get('/search/byname', jobController.getJobsByName);
router.delete('/:id', adminAuth, jobController.deleteJob);

module.exports = router;
