const mongoose = require('mongoose');
const validator = require('validator');

const taskSchmea = new mongoose.Schema({
    description:{
        type:String,
        required: true,
        trim:true,

    },
    completed:{
        default:false,
        type:Boolean
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'
    }
},{
    timestamps:true
});




const Task = mongoose.model('Task',taskSchmea);



module.exports= Task