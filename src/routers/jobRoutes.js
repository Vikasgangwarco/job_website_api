const express = require('express');
const Job = require('../models/job');
const router = express.Router();

// Post a Job (only for recruiters)
router.post('/post', async (req, res) => {
    const { title, description } = req.body;
    // const recruiterId = req.user._id;  // Assuming you have a middleware for JWT token validation
    const { recruiterId } = req.body;


    try {
        const newJob = new Job({ title, description, recruiter: recruiterId });
        await newJob.save();
        res.status(201).json({ message: 'Job posted successfully!', job: newJob });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get all Jobs (for candidates to see)
router.get('/', async (req, res) => {
    try {
        const jobs = await Job.find().populate('recruiter', 'name email');
        res.status(200).json({ jobs });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
