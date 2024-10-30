import mongoose from "mongoose";

const connectDB = async ()=>{
    try{
        await mongoose.connect(`mongodb://localhost:27017/`)
        console.log('Conectado ao Mongoose');
    }catch(err){
        console.log(err);
    }
}
connectDB()
export default mongoose

//mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.CLUSTER_ADDRESS}/${process.env.DB_NAME}