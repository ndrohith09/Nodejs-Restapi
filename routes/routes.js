const express = require('express');
const Model = require('../models/model');
const router = express.Router()


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