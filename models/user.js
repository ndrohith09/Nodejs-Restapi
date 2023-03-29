const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { 
        required: true,
        type: String
    },
    email: {
        length : 50,
        type: String
    },
    contact: { 
        type: String,
        length: 15,
    },
    gender : {
        type: String,
        enum : ['M' , 'F' , 'O'],
        default : null
    },
    address : {
        type: String,
    },
    status : {
        type : Boolean,
        default : 1,
        // 1 : active , 0 : inactive
    },
    created_at : {
        type : Date,
        default: new Date().getTime()
    },
    updated_at : {
        type : Date,
        default: null
    }
})

const UserModel = mongoose.model('User' , userSchema);
export default UserModel;