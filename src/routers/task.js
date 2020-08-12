const express = require('express');
const Task = require('../models/task');
const auth = require('../middleware/auth');
const router = new express.Router();

router.post('/tasks',auth ,async (req,res)=>{
    //const task= new Task(req.body)
    // task.save().then(()=>{
    //     res.status(201).send(task)appappapp
    // }).catch((error)=>{
    //     res.status(400).send(error)
    // })

    const task = new Task({
        ...req.body,
        owner:req.user._id
    })

    try{
        await task.save()
        res.status(201).send(task)
    }catch(error){
        res.status(400).send(error)
    }
});

router.get('/tasks',async (req,res)=>{
    // Task.find({}).then((tasks)=>{
    //     res.send(tasks)
    // }).catch((error)=>{
    //     res.send(error)
    // })

    try{
        const tasks= await Task.find({});
        res.send(tasks)
    }catch(error){
        res.send(error)
    }   
});


//GET /tasks/userspecific?completed=true
router.get('/tasks/userspecific',auth,async(req,res)=>{
    const match={}

    if(req.query.completed){
        match.completed = req.query.completed==='true'
    }

    try {
        //const tasks = await Task.find({owner:req.user._id})
        await req.user.populate({
            path:'userTasks',
            match,
            options:{
                limit:parseInt(req.query.limit),
                skip:parseInt(req.query.skip)
            }
        }).execPopulate();
        console.log(req.user.userTasks)
        res.send(req.user.userTasks)
    } catch (error) {
        res.send(error)
    }
})

router.get('/tasks/:id',auth,async (req,res)=>{
    const _id=req.params.id;
    // Task.findById(_id).then((task)=>{
    //     if(!task){
    //         res.status(404).send({error:"task not found"});
    //     }
    //     res.send(task)
    // }).catch((error)=>{
    //     res.status(500).send(error);
    // })

    try{
        //const task = await Task.findById(_id);
        const task = await Task.findOne({_id,owner:req.user._id});
        if(!task){
            res.status(404).send({error:"Task not found"})
        }
        res.send(task)
    }catch(error){
        res.status(500).send(error)
    }
})

router.patch('/tasks/:id',auth,async(req,res)=>{
    const updates= Object.keys(req.body);
    const allowedUpdates = ['description','completed']
    const isValidOperation = updates.every((update)=> allowedUpdates.includes(update))
    const _id = req.params.id;

    if(!isValidOperation){
       return res.status(400).send('Invalid Updates..!')
    }
    try{
        const task = await Task.findOne({_id:_id, owner:req.user._id})
        console.log(task)
       // const task = await Task.findById(_id);
        
       // const updatedData = await Task.findByIdAndUpdate(_id,req.body,{new:true,runValidators:true})
        if(!task){
            return res.status(404).send({error:"Task not found. Please enter valid id"})
        }
        
        updates.forEach((update)=> task[update]=  req.body[update]);
        
        await task.save()
        res.status(201).send(task)

    }catch(error){
        res.status(500).send(error)
    }
})


router.delete('/tasks/:id',auth,async (req,res)=>{
    const _id = req.params.id;
    try{
        const task = await Task.findOneAndDelete({_id:_id,owner:req.user._id})
        //const task=  await Task.findByIdAndDelete(_id);
        if(!task){
            return res.status(404).send({error:"Task not found"})
        }
        res.status(202).send({deleted:task})
    }catch(error){

        res.status(500).send(error)
    }
    
})

module.exports=router;