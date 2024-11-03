import mongoose from "mongoose";

const connectDB = async ()=>{
    try{
        await mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.CLUSTER_ADDRESS}/${process.env.DB_NAME}`)
        console.log('Conectado ao Mongoose');
    }catch(err){
        console.log(err);
    }
}
connectDB()
export default mongoose

