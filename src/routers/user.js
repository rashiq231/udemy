const express = require('express')
const User = require('../models/user')
const auth = require('../middleware/auth')

const router = new express.Router()

router.post('/users',async (req,res)=>{
    //console.log(req.body) 
    const user = new User(req.body)
    // user.save().then(()=>{
    //     res.status(201).send(user)
    // }).catch((error)=>{
    //     res.status(400).send(error);
    // })
    try{
        await user.save()
       const token = await user.generateAuthToken();
        
        res.status(201).send({user
        ,token})
    }catch(error){
        console.log(error)
        res.status(400).send(error)
    }  
    
});

router.post('/users/login',async (req,res)=>{
    try{
        const user = await User.findByCredentials(req.body.email,req.body.password)
        const token = await user.generateAuthToken();
        res.send({user,token})
    }catch(error){
        
        res.status(400).send()
    }
})

router.post('/users/logout',auth,async (req,res)=>{
    try {
        req.user.tokens= req.user.tokens.filter((token)=>{
            return token.token !== req.token;
        })

        await req.user.save()
        res.status(200).send({msg:"logout successful"})
    } catch (error) {
        res.status(500).send("Invalid operation")   
    }
})


router.post('/users/logoutAll',auth ,async (req,res)=>{
    try {
        // req.user.tokens = req.user.tokens.filter((token)=>{
        //     return token.token === null;

        //})
        req.user.tokens=[]
        await req.user.save()
        console.log(req.user)
        res.status(200).send({msg:"Logout from all successfull"})
    } catch (error) {
        res.status(500).send(error)
    }
})



router.get('/users',auth,async (req,res)=>{
    // User.find({}).then((users)=>{
    //     res.send(users)
    // }).catch((error)=>{
    //     res.status(500).send(error)
    // })
    
    try{
        const users = await User.find({});
        res.send(users)
    }catch(error){
        res.status(500).send(error)
    }

});

router.get('/users/me',auth,async(req,res)=>{
    res.send(req.user)
})

router.get('/users/:id',async (req,res)=>{
    // console.log(req.params)
    const _id = req.params.id;
    // User.findById(_id).then((user)=>{
    //     if(!user){
    //         return res.status(404).send();
    //     }
    //     res.send(user)
    // }).catch((error)=>{
    //     console.log(error)
    //     res.status(500).send(error)
    // })

    try{
        const user = await User.findById(_id);
        if(!user){
            return res.status(404).send("No user found")
        }
        res.send(user)
    }catch(error){
        res.status(500).send(error)
    }

});

router.patch('/users/me',auth ,async (req,res)=>{
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name','age','password','email'];
    const isValidOperation = updates.every((update)=>allowedUpdates.includes(update));
    if(!isValidOperation){
        return res.status(404).send({error: "cannot update the values "+updates})
    }
    try {
        updates.forEach((update)=> req.user[update]= req.body[update]);
        await req.user.save()
        res.status(200).send({msg:"ok","updated User":req.user});
    } catch (error) {
        console.log(error)
        res.status(400).send("cannot update user"+ error)
    }
});

// router.patch('/users/:id', async (req,res)=>{
//     let state;
//     const updates = Object.keys(req.body);
//     // console.log(updates)
//     const allowedUpdates =['name','age','password','email']
//     const isValidOperation = updates.every((update)=> allowedUpdates.includes(update))

//     if(!isValidOperation){
//         return res.status(404).send({error: "cannot update the values "+updates})
//     }

//     try{ 
//         const _id = req.params.id;
//         const user = await User.findById(_id)

        
//         // const user= await User.findByIdAndUpdate(_id, req.body,{new: true,runValidators:true});
//         if(!user){
//             return res.status(404).send("User not found")
//         }
        
//         updates.forEach((update)=> user[update]= req.body[update])
//         await user.save()
//         res.status(202).send(user)

//     }catch(error){
//         res.status(404).send(error)
//     }
// });


// router.delete('/users/:id', async (req,res)=>{
//     const _id = req.params.id;
//     const user = await User.findByIdAndDelete(_id);
//     try {
//         if(!user){
//         return res.status(404).send({error:"User not found"})
//     }
//     res.status(202).send({deleted:user})
//     }catch(error){
//         return res.status(500).send(error)
//     }
// });

router.delete('/users/me',auth,async (req,res)=>{
    await req.user.remove()
    res.status(200).send({msg:"User deleted", user:req.user})
})

module.exports = router
