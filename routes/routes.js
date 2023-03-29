const express = require('express');
const Model = require('../models/model');
const router = express.Router()
const mongoose = require('mongoose');

// const mongoString = process.env.DATABASE_URL
// mongoose.connect(mongoString);
// const database = mongoose.connection;

// create mongodb schema on posting data to /api/schema

router.post('/schema', async (req, res) => {
    console.log("12==============>",req.body);
    const dbName = req.body.dbName;
    //get userschema from request body
    const Schema = req.body.Schema;    
    const collection = req.body.collection;
    console.log("Schema---->" , Schema);

    try {
        // create schema along with collection name 
        const userSchema = new mongoose.Schema(Schema , {collection: collection});
        const Database = mongoose.model(dbName, userSchema);
        console.log("Database---->" , Database);
        console.log('Res-------->' , res)

        // save data 
        const data = new Database({
            name: "name goes here",
            age: 23
        })
        const dataToSave = await data.save();
        console.log("dataToSave---->" , dataToSave);
        // send response to client 
        res.status(200).json(
            {message: 'Schema created successfully',
            dbName : dbName
        },
            ) 
  
    }
    catch (error) {
        res.status(400).json({message: error.message})
    }
})

// router to post data to desired schema
router.post('/addToSchema', async (req, res) => {

    console.log("12==============>",req.body);
    const dbName = req.body.dbName;
    const dbData = req.body.dbData;
    const schema = req.body.schema;
    
    try{

    const Model = mongoose.model(dbName, schema);
    const instance = new Model(dbData);
    const dataToSave = await instance.save();
    console.log("dataToSave---->" , dataToSave);        
    res.status(200).json(
        {message: 'Data added successfully'})
    }
    catch (error) {
        res.status(400).json({message: error.message})
    }
    
})

router.get("/get" , async (req , res , next) => {
    next(new Error("catch me if you can"));
})


/* pagination */
router.get('/getpage', async (req, res) => {
    const page = parseInt(req.query.page || 0);
    const limit = parseInt(req.query.limit || 10);
    const collection = req.query.collection;
    let posts = []
    db.collection(collection)
    .find()
    .sort({ author : 1})

    // let posts = = await Model.find(); 
})

/*
@body: name, age 
@response: name, age, _id
@method: POST
@status: 200
*/

router.post('/post', async (req, res) => {
    const data = new Model({
        name: req.body.name,
        age: req.body.age
    })

    try {
        const dataToSave = await data.save();
        res.status(200).json(dataToSave)
    }
    catch (error) {
        res.status(400).json({message: error.message})
    }
})

/*
@response: name, age, _id
@method: GET
@status: 200
*/

router.get('/getAll', async (req, res) => {
    try{
        const data = await Model.find(); 
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

/*
@query_param: age 
@response: name, age, _id
@method: GET
@status: 200
*/

router.get(
    '/get', 
    async (req, res) => {
    try{
        var age=req.query.age;
        const data = await Model.find({age: age});
        // validate data is non-empty
        if (data.length === 0) {
            res.status(404).json({message: 'No data found'});
        }
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

/*
@path_params: id 
@response: name, age, _id
@method: GET
@status: 200
*/

router.get('/getOne/:id', async (req, res) => {
    try{
        const data = await Model.findById(req.params.id);
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})



/*
@path_params: id 
@response: name, age, _id
@method: PATCH
@status: 200
*/

router.patch('/update/:id', async (req, res) => {
    try{
        const id = req.params.id;
        const updateData = req.body; 
        const options = { new : true };  

        const results = await Model.findByIdAndUpdate(
            id , updateData , options
        )
        res.send(results)
    }
    catch(error){
        console.log(error)
        res.status(400).json({message: error.message})
    }
})

/*
@path_params: id 
@response: name, age, _id
@method: DELETE
@status: 200
*/

router.delete('/delete/:id', async (req, res) => {
    try{
        const id = req.params.id;
        const data = await Model.findByIdAndDelete(id);
        res.json(`Document with ${data.name} has been deleted..`);
    }
    catch(error){
        res.status(400).json({message: error.message})
    }
})

module.exports = router;