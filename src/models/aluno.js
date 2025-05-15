import mongoose from 'mongoose';
const { Schema } = mongoose;


const AlunoSchema = new Schema({
    aluno: {
        type: String,
        required: true
    },

})

const Aluno = mongoose.model("Aluno", AlunoSchema);
export default Aluno