import Aluno from "../models/aluno.js";

export const buscarAlunos = async (req, res) => {
        const nomeAluno = req.query.aluno; // Captura o nome digitado do aluno
        if (!nomeAluno) {
            return res.status(400).json({ message: "Nome é obrigatório para busca" });
        }
    
        try {
            // Faz uma busca no MongoDB para alunos que começam com o texto digitado (case-insensitive)
            const alunos = await Aluno.find({ aluno: { $regex: new RegExp('^' + nomeAluno, 'i') } }).limit(10);
            res.json(alunos);

        } catch (error) {
            console.error("Erro ao buscar alunos:", error);
            res.status(500).json({ message: "Erro ao buscar alunos" });
        }
};

const store = async (req,res)=>{
    try{
    const connect = await Aluno.create(req.body)
    res.status(201).json(connect)
    }catch(err){
        console.log(err);
    }
}

const index = async (req, res) => {
    try {
        const alunos = await Aluno.find();
        res.status(200).json(alunos);
    } catch (err) {
        console.log(err);
    }
};


const show = async (req,res)=>{
    try{
        const connect = await Aluno.findById(req.params.id)
        res.status(200).json(connect)
    }catch(err){
        console.log(err);
    }
}
  
const update = async (req, res) => {
    try {
        const alunoAtualizado = await Aluno.findByIdAndUpdate(req.params.id, req.body, { new: true });
        
        if (!alunoAtualizado) {
            return res.status(404).json({ success: false, message: "Aluno não encontrado." });
        }

        res.status(200).json({ success: true, data: alunoAtualizado });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Erro ao atualizar o aluno." });
    }
};

const destroy = async (req,res)=>{
    try{
        const connect = await Aluno.findByIdAndDelete(req.params.id)
        res.status(200).json(connect)
    }catch(err){
        console.log(err);
    }
}

export default {store, index, show, update, destroy, buscarAlunos}