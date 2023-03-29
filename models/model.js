const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    name: {
        required: true,
        type: String
    },
    age: {
        required: true,
        type: Number
    }
})

// const customSchema = new mongoose.Schema({
//     data : [dataSchema],
//     user : [userSchema]
// })

// const userSchema = new mongoose.Schema({
//     name: { 
//         required: true,
//         type: String
//     },
//     email: {
//         required: true,
//         type: String
//     },
//     password: {
//         required: true,
//         type: String
//     },
// })

module.exports = mongoose.model('Data', dataSchema );