// const mongodb = require('mongodb');
// const MongoClient = mongodb.MongoClient
// const ObjectID = mongodb.ObjectID

const {MongoClient,ObjectID} = require('mongodb')
const connectionURL = 'mongodb://127.0.0.1:27017'

const databaseName = 'task-manager'

// const id = new ObjectID()

// console.log(id.id.length)
// console.log(id.toHexString().length)



MongoClient.connect(connectionURL,{useNewUrlParser:true}, (error,client)=>{

    if(error){
        return console.log("Unable to connect to database")
    }
    console.log("Connected to mongodb")

    const db = client.db(databaseName)

    // db.collection('users').insertOne({
    //     // _id: id,
    //     name : "Rashiq",
    //     age : 27

    // } ,(error,result)=>{
    //     if(error){
    //         return console.log("Unable to insert user "+error)
    //     }
    //     console.log(result.ops)
    // })

    // db.collection('users').insertMany([
    //     {
    //         name : "Shaik",
    //         age : 28
    //     },
    //     {
    //         name : "Saleem",
    //         age : 29
    //     }
    // ],(error,result)=>{
    //     if(error){
    //         return console.log("Error during insertion")
    //     }
    //     console.log(result.ops);
    //     console.log(result.insertedCount);
    // })


    // db.collection('tasks').insertMany([
    //     {
    //         description : "Learning node.js",
    //         completed : true
    //     },
    //     {
    //         description : "Wakeup in the morning",
    //         completed : true
    //     },
    //     {
    //         description : "Married",
    //         completed : false
    //     }
    // ],(error, result)=>{
    //     if(error){
    //        return console.log("Error while inserting documents")
    //     }
    //     console.log(result.ops)
    // })

    // db.collection('tasks').findOne({_id:new ObjectID("5f164e779ea77bce7a254f77")},(error,user)=>{
    //     if(error){
    //         return console.log("Unable to find the user")
    //     }
    //     console.log(user)
    // })

    // db.collection('tasks').find({completed:true}).toArray((error,tasks)=>{
    //     if(error){
    //         return console.log(error)
    //     }
    //     console.log(tasks)
    // })

    // const updatePromise = db.collection('users').updateOne({
    //     _id: new ObjectID('5f18f06cf63698a855970e38')
    // }, {
    //     $inc:{
    //         age:1
    //     }
    // }).then((result=>{
    //     console.log(result)
    // })).catch((error)=>{
    //     console.log("There is an error ..!", error)
    // });

    // db.collection('tasks').updateMany({
    //     completed:true
    // },{
    //     $set:{
    //         completed:false
    //     }
    // }).then((result)=>{
    //     console.log('Update many successfull and total modified objects '+ result.modifiedCount)
    // }).catch((error)=>{
    //     console.log("There is some error.."+error)
    // })

    // db.collection('users').deleteMany({
    //     age:30
    // }).then((result)=>{
    //     console.log('Delete successfull ..!'+result.deletedCount)
    // }).catch((error)=>{
    //     console.log("there is an eroor "+ error)
    // })
    db.collection('tasks').deleteOne({
        description:"Married"
    }).then((result)=>{
        console.log("Deleted a document ..!"+result.deletedCount)
    }).catch((error)=>{
        console.log("There is an error")
    })

})