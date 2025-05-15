import mongoose from 'mongoose';
const { Schema } = mongoose;

const emprestimoSchema = new Schema({
    aluno: {
        type: String,
        required: true
    },
    turma: {
        type: String,
        required: true
    },
    Livro_emprestado: {
        type: String,
        required: true
    },
    Data_emprestado:{
        type: Date,
        required:false
    },
    Data_devolucao:{
        type: Date,
        required: false
    },
    status: {
        type: String,
        enum: ['Devolvido', 'Pendente', 'Atrasado'],
        default: 'Pendente'
    }

})

const Emprestimo = mongoose.model("Emprestimo", emprestimoSchema);
export default Emprestimo