require('../src/db/mongoose');
const User = require('../src/models/user')

//5f1bad80e0470a4c0853eaf4

// User.findByIdAndUpdate('5f1bad04e0470a4c0853eaf3',{age:28}).then((user)=>{
//     console.log(user);
//     return User.countDocuments({age:29})
// }).then((users)=>{
//     console.log(users)
// }).catch((error)=>{
//     console.log(error)
// })


const updateAgeAndCount = async (id,age)=>{
    const user = await User.findByIdAndUpdate(id,{age});
    const count = await User.countDocuments({age})
    
    return {count, user}
}
const _id='5f1bafc022d6804e17980c7d';
const age= 29;
updateAgeAndCount(_id,age).then((result)=>{
    console.log(result.count);
    console.log(result.user)
    
}).catch((error)=>{
    console.log("error "+ error)
})