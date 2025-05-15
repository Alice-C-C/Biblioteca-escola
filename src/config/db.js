import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.CLUSTER_ADDRESS}/${process.env.DB_NAME}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Conectado ao Mongoose');
  } catch (err) {
    console.error('Erro na conexão com o MongoDB:', err);
    process.exit(1);
  }
};

export default connectDB;
