const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.ObjectId;

const jobSchema = new mongoose.Schema({
    title: {
         type: String, 
         required: true 
    },
    description: {
         type: String, 
         required: true 
    },
    recruiter: {
         type: ObjectId, 
         ref: 'User', 
         required: true 
}
});

module.exports = mongoose.model('Job', jobSchema);
