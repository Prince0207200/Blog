import mongoose from "mongoose";

const connectDB=async()=>{
    try {
      const connectionInstance=  await mongoose.connect(`${process.env.MONGODB_URI}/Blog`);
    //   console.log(connectionInstance);
      
      console.log(`\n MOngodb connected.`);
      
    } catch (error) {
        console.log("MONGODB connection error",error);
        process.exit(1)
    }
}

export default connectDB