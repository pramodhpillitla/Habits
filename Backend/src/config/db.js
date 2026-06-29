import  mongoose from 'mongoose';

const connectDB = async () =>{
    try{
        await mongoose.connect(process.env.MONGO_DB_URI);
        console.log("MongoDB Connected")

    }catch(err){
        console.log(`Error while connecting to DB: ${err}`);
        process.exit(1);
    }
}

export default connectDB;