const express = require('express');
const Application = require('../models/Application');
const Job = require('../models/job');
const sendEmail = require('../utils/sendEmail');
const router = express.Router();

// Apply for a job
router.post('/apply/:jobId', async (req, res) => {
    const { jobId } = req.params;
    // const candidateId = req.user._id;  // Assuming middleware verifies token and user
    const { candidateId, candidateEmail, candidateName } = req.body;

    try {
        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(404).json({ message: 'Job not found!' });
        }

        const newApplication = new Application({ job: jobId, candidate: candidateId });
        await newApplication.save();

        // Notify candidate and recruiter
        // sendEmail(req.user.email, 'Job Application Submitted', `You applied for job: ${job.title}`);
        // sendEmail(job.recruiter.email, 'New Job Application', `Candidate ${req.user.name} applied for your job: ${job.title}`);
        sendEmail(candidateEmail, 'Job Application Submitted', `You applied for job: ${job.title}`);
        sendEmail(job.recruiter.email, 'New Job Application', `Candidate ${candidateName} applied for your job: ${job.title}`);

        res.status(201).json({ message: 'Application submitted successfully!' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get all jobs applied by the candidate
router.get('/my-applications', async (req, res) => {
    const candidateId = req.user._id;

    try {
        const applications = await Application.find({ candidate: candidateId }).populate('job', 'title description');
        res.status(200).json({ applications });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get all applicants for a specific job (for recruiters)
router.get('/applicants/:jobId', async (req, res) => {
    const jobId = req.params.jobId;

    try {
        const applications = await Application.find({ job: jobId }).populate('candidate', 'name email');
        res.status(200).json({ applications });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
