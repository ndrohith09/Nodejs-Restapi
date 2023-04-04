const express = require('express');
const mongoose = require('mongoose');
<br><div>// adding some comments here for the function</div><div>
const app = express();
const port = 3000;

const routes = require('./routes/routes');    

require('dotenv').config();

const mongoString = process.env.DATABASE_URL

// middldeware to accept json data 
app.use(express.json());

// middleware to accept url encoded data
app.use(express.urlencoded({extended: true}));

try{
    // mongoose.connect(mongoString, {
    //     useNewUrlParser: true,
    //     useUnifiedTopology: true,
    //     useFindAndModify: false
    // });
    mongoose.connect(
        'mongodb+srv://restapi.iablilf.mongodb.net/?retryWrites=true&amp;w=majority',
        {
            dbName : 'DB1',
            user : 'ndrohith09',
            pass : 't54bLYDvuJGZoXI7',
            useNewUrlParser: true,
        });
    
    // mongoose.connect(mongoString
    // ,{
    //     useNewUrlParser: true, 
    // }
    // );
    const database = mongoose.connection

    database.on('error', (error) =&gt; {
        console.log(error)
    })

    database.once('connected', () =&gt; {
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

app.all('/test', (req, res) =&gt; {
    console.log('All' , req.body);    
// app.all('/test/:id/:name', (req, res) =&gt; {    
    res.send(req.body);    
// res.send(req.params);
    // console.log('All' , req.query);
    // res.send(req.query);
})

app.use((req  , res , next) =&gt; {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
})


// Error handler
app.use((err, req, res, next) =&gt; {
    res.status(err.status || 500);
    res.send({
        error: {
            status: err.status || 500,
            message: err.message
        }
    })
})

app.listen(port, () =&gt; {
    console.log(`Server started at ${port}...`)
}); 

</div>