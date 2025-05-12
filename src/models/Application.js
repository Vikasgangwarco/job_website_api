const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.ObjectId;

const applicationSchema = new mongoose.Schema({
    job: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Job', required: true
    },
    candidate: {
        type: ObjectId,
        ref: 'User', required: true
    },
    appliedAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Application', applicationSchema);
