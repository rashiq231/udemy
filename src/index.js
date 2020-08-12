const express = require('express');
require('./db/mongoose');
const User = require('./models/user');
const Task = require('./models/task');
const userRouter = require('../src/routers/user')
const taskRouter = require('../src/routers/task')
const app = express();

const port = process.env.PORT || 3000;


// app.use((req,res, next)=>{
//     if(req.method==='GET'){
//         res.send("Get is disabled")

//     }else{
//         next()
//     }
// })

// app.use((req,res,next)=>{
//     if(req.method !==null){
//         res.status(503).send("Site is under maintenance,check back later")
//     }
// })



app.use(express.json());
app.use(userRouter);
app.use(taskRouter);


app.get('/*',(req,res)=>{
    res.status(404).send("No such path exists")
})

app.listen(port,()=>{
    console.log("Server is up and running on 3000")
})

// const main = async ()=>{
// //     const task = await Task.findById('5f30a4620e8f63484c80905c');
// //    const user= await task.populate('owner').execPopulate();
// //     console.log(task.owner);
// //     //console.log(user)

//     const user = await User.findById('5f30a4420e8f63484c80905a')
//     await user.populate('userTasks').execPopulate()
//     console.log(user.userTasks);

// }

// main()










// const jwt = require('jsonwebtoken');
// const myfunct = async ()=>{
//         const token = await jwt.sign({_id:"123"},'hello',{expiresIn:'7 days'})
//         console.log(token);
//         const data = jwt.verify(token,'hello')
//         console.log(data)
// }

// myfunct()