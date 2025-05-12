const mongoose = require("mongoose");
const dotenv = require('dotenv');

dotenv.config();

const dburl = process.env.MONGO_URI;

mongoose.set('strictQuery', false);

mongoose.connect(dburl)
    .then(() => {
        console.log('MongoDB connection successful ✅');
    })
    .catch((err) => {
        console.error('MongoDB connection failed ❌:', err.message);
        process.exit(1); // Exit process with failure code
    });

// const dburl = "mongodb+srv://Virendra:Virendra1234@cluster0.7haviv6.mongodb.net/notesuser?retryWrites=true&w=majority";
// mongoose.set('strictQuery', false);

// mongoose.connect(dburl
//     ).then(()=>{
//         console.log(`connection is successful `);
//     }).catch((err)=>{
//         console.log(`connection is failed ${err}`);
//     }
//     );