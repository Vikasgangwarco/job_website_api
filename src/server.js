const express = require('express');
const mongoose = require('mongoose');
const app = express();
const dotenv = require('dotenv');
// const Note = require('./models/Note');
// const Note = require('./models/user');
// const Note = require('./models/job');
// const Note = require('./models/Application');

const authRoutes = require('./routers/authRoutes');
const jobRoutes = require('./routers/jobRoutes');
const applicationRoutes = require('./routers/applicationRoutes');

require("./conn");

const cors = require('cors');

// Load environment variables
dotenv.config();

app.use(express.json());
app.use(cors());

// const studentRouter = require("./routers/student");

const port = process.env.PORT || 8000;

app.use(express.json());

// app.use(studentRouter);

app.use('/api/auth', authRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/applications', applicationRoutes);





app.listen(port, function(){
    console.log(`server is running on port ${port}`);   
});


