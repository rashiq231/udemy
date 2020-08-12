const mongoose = require('mongoose');
const validator =  require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Task = require('./task')

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required:true,
        trim:true
    },
    age:{
        type: Number,
        default:20,
        validate(value){
            if(value <0){
                throw new Error('Age must be a positive number')
            }
        }
    },
    email:{
        type:String,
        required:true,
        unique:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error(" Email is invalid");
            }
        },
        trim:true,
        lowercase:true,
        // default:"test@gmail.com"
    },
    password:{
        required:true,
        type:String,
        // lowercase:true,
        trim:true,
        minlength:7,
        validate(value){
            if(value.toLowerCase().includes('password')){
                throw  new Error("Password cannot contain 'password'")
            }
        }
    },

    tokens:[{
        token:{
            type:String,
            required:true
        }
    }]
},{
    timestamps:true
})


userSchema.virtual('userTasks',{
    ref:'Task',
    localField:'_id',
    foreignField:'owner'
})


userSchema.methods.toJSON = function(){
    const user =this;
    const userObject= user.toObject();

    delete userObject.password
    delete userObject.tokens

    return userObject
}
// userSchema.methods.getPublicProfile = function(){
//     const user= this;
//     const userObject = user.toObject()

//     delete userObject.password
//     delete userObject.tokens

//     console.log(user)
//     return userObject
// }


// on methods
userSchema.methods.generateAuthToken = async function(){
    const user =this;
    const token = await jwt.sign({_id:user._id.toString()},'rashiq')
    user.tokens = user.tokens.concat({token:token})
    await user.save()
    return token;
}

//on static 
userSchema.statics.findByCredentials= async (email,password)=>{
    const user = await User.findOne({email:email});

    if(!user){
        throw new Error("user id error");
    }

    const isMatch = await bcrypt.compare(password,user.password);

    //console.log(isMatch)
    if(!isMatch){
        console.log("there is an error")
        throw new Error("password error");
    }

    return user
}

// encryting password before saving
userSchema.pre('save',async function (next) {
    const user = this;
    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password,8);
    }

    next()
})

// Deleteing tasks when user is deleted

userSchema.pre('remove',async function(next){
    const user = this
    await Task.deleteMany({owner:user._id})

    next()
})

const User = mongoose.model('User',userSchema);

module.exports= User