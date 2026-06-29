import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        lowercase:true

    },
    password:{
        type:String,
        required:true,
        minLength:6
    },
    currentStreak:{
        type:Number,
        default:0,
        min:0
    },
    highestStreak:{
        type:Number,
        default:0,
        min:0
    },
    totalCompletions: {
        type: Number,
        default: 0,
        min: 0,
    },
},{
    timestamps:true,
})

const User = mongoose.model('User', userSchema);
export default User;
