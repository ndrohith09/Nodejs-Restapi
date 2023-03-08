const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = 3000;

const routes = require('./routes/routes');    

require('dotenv').config();

const mongoString = process.env.DATABASE_URL

app.use(express.json());

try{
    // mongoose.connect(mongoString, {
    //     useNewUrlParser: true,
    //     useUnifiedTopology: true,
    //     useFindAndModify: false
    // });
    mongoose.connect(mongoString);
    const database = mongoose.connection

    database.on('error', (error) => {
        console.log(error)
    })

    database.once('connected', () => {
        console.log('Database Connected');
    })
    console.log('Connected to MongoDB');
}
catch(error){
    console.log('Could not connect to MongoDB');
}

console.log('Config' , express.json());
console.log('Connecting to MongoDB...');

app.use('/api', routes)

app.listen(port, () => {
    console.log(`Server started at ${port}...`)
}); 

