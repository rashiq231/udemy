require('../src/db/mongoose');
const Task = require('../src/models/task')



// Task.findByIdAndDelete(id).then((deleted=>{
//     console.log(deleted)
//     if(!deleted){
//         console.log('Document not found')
//     }
//     return Task.find({completed:false})
// })).then((list)=>{
//     console.log(list)
// }).catch((error)=>{
//     console.log(error)
// })


const deleteTaskAndCount = async (id,state)=>{
    const deleted = await Task.findByIdAndDelete(id);
    const count = await Task.countDocuments({completed:state});
    return {count,deleted};

}

const id= '5f1bb1d5e7b0b84f0d5bc55b';

deleteTaskAndCount(id,false).then((result)=>{
    console.log(result);
}).catch((error)=>{
    console.log(error)
})