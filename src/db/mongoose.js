const validator = require('validator');

const mongoose = require("mongoose");

const connection= 'mongodb://127.0.0.1:27017/task-manager-api2'; //Connection with database name

mongoose.connect(connection,{
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology: true,
    useFindAndModify:false
})



// const Task = mongoose.model('Task',{
//     description:{
//         type: String,
//         trim:true,
//         required:true
//     },
//     completed:{
//         type: Boolean,
//         default:false
//     }
// });

// const firstTask = new Task({
//     completed:false
    
// });

// firstTask.save().then((result)=>{
//     console.log(result)
// }).catch((error)=>{
//     console.log(error)
// });

// const me = new User({
//     name: '  password without lowercase   ',
//     age : 20,
//     email:'password@email.com',
//     password:'   Any  '
// })

// me.save().then(()=>{
//     console.log(me)
// }).catch((error)=>{
//     console.log('Error ..')
//     console.log(error)
// })